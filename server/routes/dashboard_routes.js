const express = require('express');
const dashboardRouter = express.Router();
const sessionManager = require('../managers/session_manager');

dashboardRouter.get('/users_online', (req, res) => {
    res.send({
        users: sessionManager.getLoggedUsers()
    });
});

module.exports = dashboardRouter;