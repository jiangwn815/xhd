var installment = async (ctx,next) => {
    ctx.render("installment3.html",{name:ctx.state.startTime,csrfToken:ctx.csrf});
};

module.exports = {
    'GET /installment': installment
};