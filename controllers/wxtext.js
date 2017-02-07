var wxtext = async (ctx,next) => {
    ctx.render("wxtext.html",{csrfToken:ctx.csrf});
};

module.exports = {
    'GET /wxtext': wxtext
};