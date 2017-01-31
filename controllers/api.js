const userService = require('./user-service');

const APIError = require('../middlewares/rest').APIError;

module.exports = {
    'GET /api/user': async (ctx, next) => {
        console.log("API USER IN!!");
        ctx.rest({
            users: await userService.getUsers()
        });
},

    'POST /api/user': async (ctx, next) => {
        var user = await userService.createUser(ctx.request.body.email, ctx.request.body.passwd, ctx.request.body.name,ctx.request.body.gender);
        ctx.rest(user);
    }/*,

    'DELETE /api/products/:id': async (ctx, next) => {
        console.log(`delete product ${ctx.params.id}...`);
        var p = products.deleteProduct(ctx.params.id);
        if (p) {
            ctx.rest(p);
        } else {
            throw new APIError('product:not_found', 'product not found by id.');
        }
}*/
};