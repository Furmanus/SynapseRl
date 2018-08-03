const Router = require('koa-router');
const router = new Router();

router.get('/', ctx => {
    ctx.redirect('/login');
});
router.get('/login', ctx => {
    ctx.render('login');
});
router.get('/dashboard', ctx => {
    ctx.render('dashboard');
});

module.exports = router;