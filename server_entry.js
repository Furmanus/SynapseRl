const path = require('path');
const Koa = require('koa');
const app = new Koa();
const Pug = require('koa-pug');
const koaStatic = require('koa-static');
const router = require('./server/router');
const port = 5050 || process.env.PORT;
const ENV = process.env.NODE_ENV;

const pug = new Pug({
    viewPath: path.resolve(__dirname, 'client/dist'),
    debug: ENV === 'development',
    app: app
});

app.use(koaStatic(path.resolve(__dirname, 'client/dist')));
app.use(router.routes())
    .use(router.allowedMethods());

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});
