// 负责导入所有model
const fs = require('fs');
const db = require('./model-base');

// 读取models目录下所有文件
let files = fs.readdirSync(__dirname);
// 筛选出所有js结尾的文件
let js_files = files.filter((f)=>{
    if(f === "model-base.js"|| f === "require-models.js"){//除掉model标准和导入model的文件
        return false;
    }
    return f.endsWith('.js');
}, files);

module.exports = {};

for (let f of js_files) {
    console.log(`import model from file ${f}...`);
    // 取文件名字部分 去掉.js扩展名
    let name = f.substring(0, f.length - 3);
    //将每个model都存至exports中
    module.exports[name] = require(__dirname + "/" + f);
}

module.exports.sync = () => {
    db.sync();
};