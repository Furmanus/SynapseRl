const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const mainRouter = require('./server/router');
const loginRouter = require('./server/routes/login_routes');
const dashboardRouter = require('./server/routes/dashboard_routes');
const serverConfig = require('./server/config/config');
const mainManager = require('./server/managers/main_manager');
const port = process.env.PORT || 5050;

mainManager.initialize(io, app);

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, 'client/dist'));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.resolve(__dirname, 'client/dist')));
app.use('/assets', express.static(path.resolve(__dirname, 'server/assets')));
app.use(loginRouter);
app.use(mainRouter);
app.use(dashboardRouter);

server.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});
