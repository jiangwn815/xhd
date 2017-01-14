var xhd = async (ctx,next) => {
    ctx.render("xhd.html");
};

module.exports = {
    'GET /xhd': xhd
};