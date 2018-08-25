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
        const sessionId = request.session.id;

        return !!this.loggedUsers.get(sessionId);
    }
    logUser(request, username) {
        const {
            session,
        } = request;
        const id = session.id;

        session.user = username;
        this.loggedUsers.set(id, {
            username
        });

        this.publish(eventNames.CLIENT_LOGGED_IN, {
            user: username,
            sessionId: id
        });
    }
    logoutUser(request) {
        this.removeUser(request);

        request.session.destroy();
    }
    removeUser(request) {
        const user = request.session.user;
        const loggedUsers = this.loggedUsers;

        if (user && loggedUsers.has(user)) {
            loggedUsers.delete(user);
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
}

module.exports = new SessionManager();