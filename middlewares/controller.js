/* 
--处理所有的路由
 */
const fs = require("fs");

function addMapping(router, mapping) {
    for (var url in mapping) {//url为形如'GET /api/user'的key
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);//绑定所有get方法的路径和处理函数
            //console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);//绑定所有post方法的路径和处理函数
           // console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router) {
    let controller_path =__dirname.substring(0,__dirname.length-11)
    console.log(controller_path);
    var files = fs.readdirSync(controller_path + '/controllers');
    //过滤出controllers文件夹下所有js文件
    var js_files = files.filter((f) => {
        if(f === "user-service.js"){
            return false;
        }
        return f.endsWith('.js');
    });
    //将每个js文件require
    for (var f of js_files) {
        //console.log(`process controller: ${f}...`);
        let mapping = require(controller_path + '/controllers/' + f);
        addMapping(router, mapping);
    }
}

module.exports = function (dir) {
    let
        controllers_dir = dir || 'controllers', // 如果不传参数，扫描目录默认为'controllers'
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};