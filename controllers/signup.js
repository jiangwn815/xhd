var signup = async (ctx,next) => {
    ctx.render("signup.html");
};

module.exports = {
    'GET /signup': signup
};