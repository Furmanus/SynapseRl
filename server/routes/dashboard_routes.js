const express = require('express');
const dashboardRouter = express.Router();
const sessionManager = require('../managers/session_manager');
const databaseManager = require('../managers/database_manager');
const logger = require('../utils/logger');

function addIfNotExist (array, entry) {
    let entryExist = false;

    array.forEach((item, index) => {
        if (item.id === entry.id && item.user === entry.user) {
            entryExist = true;
        }
    });

    if (!entryExist) {
        array.push(entry);
    }
}

dashboardRouter.get('/users_online', (req, res) => {
    const loggedUsers = sessionManager.getLoggedUsers();
    const user = sessionManager.getUserName(req);
    const userId = sessionManager.getUserId(req);
    /**
     * Poor fix condition when user refreshes browser while being logged in on dashboard page. User first reenters
     * dashboard route, and then socket is disconnected and connected again. With socket disconnection user data
     * is removed from loggedUsers array. User is logged in while on dashboard path, which happens before removal.
     */
    addIfNotExist(loggedUsers, {
        id: userId,
        user
    });

    res.send({
        users: loggedUsers
    });
});
dashboardRouter.get('/user_games', async (req, res) => {
    const userId = req.session.userId;
    let userGames;

    try {
        userGames = await databaseManager.getUserGames(userId);

        res.send(userGames);
    } catch(err) {
        res.status(500).send(err);
    }
});
dashboardRouter.post('/create_game', async (req, res) => {
    const firstPlayerId = req.session.userId;
    const firstPlayerName = req.session.user;
    const secondPlayerId = req.body.userId;

    try {
        const secondPlayer = await databaseManager.findUserById(secondPlayerId);
        const game = await databaseManager.createGame(firstPlayerId, secondPlayerId, firstPlayerName, secondPlayer.user);

        logger.logDevelopment('Game created: ');
        logger.logDevelopment(game);

        res.status(200).send({
            firstUser: game.ops[0].firstUser,
            secondUser: game.ops[0].secondUser,
            firstUserName: game.ops[0].firstUserName,
            secondUserName: game.ops[0].secondUserName,
            _id: game.ops[0]._id
        });
    } catch (err) {
        logger.logDevelopment(err);
        res.status(500).send(err);
    }
});

module.exports = dashboardRouter;