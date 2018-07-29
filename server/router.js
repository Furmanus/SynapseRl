const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx, next) => {
    ctx.redirect('/login');
});
router.get('/login', ctx => {
    ctx.render('login');
});

module.exports = router;