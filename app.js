const Koa = require('koa');
// 创建一个Koa对象表示web app本身:
const app = new Koa();
const bodyParser = require("koa-bodyparser");//用来解析post请求的body
const controller = require('./middlewares/controller');
const templating = require('./middlewares/templating');
const rest = require('./middlewares/rest');

const Sequelize = require('sequelize');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const SequelizeStore = require('koa-generic-session-sequelize');
const CSRF = require('koa-csrf').default;
const mysql = require("mysql");

const isProduction = process.env.NODE_ENV === 'production';
const isSAE = process.env.SERVER_NAME === "SAE";
var config;

if(isSAE){
    config = require('./config-sae');
}else{
    config = require('./config-local');
}


// 对于任何请求，app将调用该异步函数处理请求，用async标明，代表后面的函数里面有异步操作：
// 把很多async函数组成一个处理链
// app.use() 用来加载中间件
// ctx封装request response
// 第一个middleware计算页面执行时间
app.use(async (ctx, next) => {
    //每个请求会创建一个上下文 存在this中
     var
        start = new Date().getTime(),
        execTime;
        ctx.state.startTime = new Date();
   // console.log(`----Process ${ctx.request.method} ${ctx.request.url}...Start:${start}`);
    //console.log(`----Type:${ctx.request.type} Path:${ctx.request.path} Host:${ctx.request.host}`);
        // 如果没有await next（）后续的middleware将不再执行，可以通过if 判断是否要继续执行
    await next();// await 表示紧跟后面的表达式需要等待结果
    execTime = new Date().getTime() - start;
   // console.log(`----End ${ctx.request.method} ${ctx.request.url}.COST:${execTime}ms`);
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});




var connection = mysql.createConnection(config);
connection.query("select * from users", function (err, rows, fields) {
        if (err) throw err;
        console.log("MYSQL CONTENT:"+rows[0].passwd);
        connection.end();

        
    });

// 第二个middleware处理静态文件

    let staticFiles = require('./middlewares/static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));

/*
app.keys = ['your-session-secret'];
app.use(session({
        store: new MysqlStore(config),
        rolling: true,
        cookie: {
            maxage:30 * 60 * 1000
        }
}));*/
//addControllers(router);
// 第三个middleware处理POST请求
app.use(bodyParser());//必须在router之前注册bodyParser

app.use(new CSRF({
  invalidSessionSecretMessage: 'Invalid session secret',
  invalidSessionSecretStatusCode: 403,
  invalidTokenMessage: 'Invalid CSRF token',
  invalidTokenStatusCode: 403
}));

app.use(templating('view', {
    noCache: !isProduction,
    watch: !isProduction
}));


// bind .rest() for ctx:
app.use(rest.restify());
//app.use(router.routes());
app.use(controller());

// 在端口3000监听:
//listen是对http.creatServer的封装
//可在多个端口启动app如同时支持http https
app.listen(process.env.PORT||4900);
console.log('app started at port: '+process.env.PORT||4900);
console.log('app started at '+process.env.NODE_ENV+" mode");
