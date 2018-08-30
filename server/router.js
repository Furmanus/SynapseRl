const express = require('express');
const mainRouter = express.Router();
const sessionManager = require('./managers/session_manager');
const routingHelper = require('./helpers/routing_helper');
const logger = require('./utils/logger');
const logDevelopment = logger.logDevelopment;
const logRoute = logger.logRoute;

mainRouter.get('/', (req, res) => {

    res.redirect('/login');
});
mainRouter.get('/login', (req, res) => {
    const user = sessionManager.getUserName(req);
    const sessionId = sessionManager.getSessionId(req);

    logRoute(req);

    if (user && sessionId) {
        sessionManager.logUser(user, sessionId);
        res.redirect('/dashboard');
    } else {
        res.render('login');
    }
});
mainRouter.get('/logout', (req, res) => {
    logRoute(req);

    sessionManager.logoutUser(req);

    res.send({
        result: 'ok',
        error: false
    });
});
mainRouter.all('*', (req, res, next) => {
    logRoute(req);

    if (sessionManager.getUserName(req)) {
        logDevelopment(`${req.session.user} user successfully went through session validation`);
        next();
    } else {
        logDevelopment(`${req.session.user} is logged out, redirecting to login page`);
        routingHelper.forceRedirect('/login', req, res);
    }
});
mainRouter.get('/dashboard', (req, res) => {
    const user = sessionManager.getUserName(req);

    logRoute(req);

    res.render('dashboard', {
        user: user
    });
});

module.exports = mainRouter;