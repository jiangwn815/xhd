var signup = async (ctx,next) => {
    ctx.render("signup.html",{csrfToken:ctx.csrf});
};

module.exports = {
    'GET /signup': signup
};