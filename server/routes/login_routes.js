const express = require('express');
const loginRouter = express.Router();
const DatabaseManager = require('../managers/database_manager');
const sessionManager = require('../managers/session_manager');
const cryptoHelper = require('../helpers/crypto_helper');
const logger = require('../utils/logger');
const logRoute = logger.logRoute;

loginRouter.post('/register_validation', async (req, res) => {
    const {
        user
    } = req.body;
    const isUserFound = await DatabaseManager.findUser(user);

    logRoute(req);

    res.send({
        isUserFound: !!isUserFound
    });
});
loginRouter.post('/login_validation', async (req, res) => {
    const {
        user,
        password
    } = req.body;
    const userData = await DatabaseManager.findUser(user);
    let isPasswordCorrect;

    logRoute(req);

    if (userData) {
        isPasswordCorrect = await cryptoHelper.compare(password, userData.password);
    }

    if (userData && isPasswordCorrect) {
        sessionManager.logUser(req, userData);

        res.send({
            redirect: `/app`
        });
    } else {
        res.send({
            error: `Wrong user name or password`
        });
    }
});
loginRouter.post('/register', async (req, res) => {
    const {
        user_name,
        password
    } = req.body;
    let hashedPassword;

    logRoute(req);

    try {
        hashedPassword = await cryptoHelper.encrypt(password);
        const insertedUserData = await DatabaseManager.insertNewUser(user_name, hashedPassword);

        sessionManager.logUser(req, insertedUserData.ops[0]);
        res.redirect(`/app`);
    } catch (err) {
        console.log(err);
        res.status(500).send({err});
    }
});

module.exports = loginRouter;