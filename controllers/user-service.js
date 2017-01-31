//api对应的执行函数
const model = require('../models/require-models');
let User = model.Users;

module.exports = {
    getUsers: async () => {       
        users = await User.findAll();
        console.log("get users function is runnning.......");
        return users;
        /*(async () => {
            users = await User.findAll();
            return users;
        })();*/       
},
    createUser: async (email,passwd,name,gender) => {
        gender = gender || true;
        console.log(`Create user${email} is running.......`);
        var user = await User.create({
            email:email,
            passwd:passwd,
            name:name,
            gender:gender

        });
        return user;
    }/*,

    getProduct: (id) => {
        var i;
        for (i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                return products[i];
            }
        }
        return null;
    },

    deleteProduct: (id) => {
        var
            index = -1,
            i;
        for (i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            // remove products[index]:
            return products.splice(index, 1)[0];
        }
        return null;
    }*/
};