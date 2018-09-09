const config = require('../config/config');
const Observable = require('observable-lc');
const eventNames = require('../constants/events');
const session = require('express-session');
const sharedSession = require('express-socket.io-session');

class SessionManager extends Observable {
    constructor() {
        super();
        this.loggedUsers = new Map();
        this.session = null;
        this.sharedSession = null;
    }
    initialize(expressApp, io) {
        this.session = session(config.sessionConfig);
        this.sharedSession = sharedSession(this.session, {
            autoSave: true
        });

        expressApp.use(this.session);
        io.use(this.sharedSession);
    }
    isUserLogged(request) {
        const userId = request.session.userId;

        return !!this.loggedUsers.get(userId);
    }
    logUser(request, userData) {
        const {
            session,
        } = request;
        const id = String(userData._id);
        const name = userData.user;

        session.user = name;
        session.userId = id;

        if (!this.loggedUsers.has(id)) {
            this.loggedUsers.set(id, {
                username: name
            });
        }

        this.publish(eventNames.CLIENT_LOGGED_IN, {
            user: name,
            id
        });
    }
    logoutUser(request) {
        const {
            userId,
            user
        } = request.session;

        this.removeUser(userId, user);

        request.session.destroy();
    }
    removeUser(id, user) {
        const loggedUsers = this.loggedUsers;

        if (loggedUsers.has(id) && loggedUsers.get(id).username === user) {

            loggedUsers.delete(id);

            this.publish(eventNames.CLIENT_LOGGED_OUT, {
                id,
                user
            });
        }
    }
    getLoggedUsers() {
        const usersArray = [];
        const loggedUsersKeys = this.loggedUsers.entries();

        for (let item of loggedUsersKeys) {
            usersArray.push({
                user: item[1].username,
                id: item[0]
            });
        }

        return usersArray;
    }
    addSocketInfoToUserData(username, socketId) {
        this.loggedUsers.forEach(value => {
            if (value.username === username) {
                value.socketId = socketId;
            }
        });
    }
    getSessionId(request) {
        return request.session.id;
    }
    getUserName(request) {
        return request.session.user;
    }
    getUserId(request) {
        return request.session.userId;
    }
}

module.exports = new SessionManager();