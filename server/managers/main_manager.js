const sessionManager = require('./session_manager');
const socketManager = require('./socket_manager');
const socketEvents = require('../constants/socket_events');
const eventNames = require('../constants/events');
const Observable = require('observable-lc');

class MainManager extends Observable {
    constructor() {
        super();
        this.sessionManager = sessionManager;
        this.socketManager = socketManager;

        this.attachEvents();
    }
    initialize(io, expressApp) {
        this.socketManager.initialize(io);
        this.sessionManager.initialize(expressApp, io);
    }
    attachEvents() {
        this.socketManager.subscribe(socketEvents.CONNECTION, this.onSocketConnection.bind(this));
        this.socketManager.subscribe(socketEvents.DISCONNECTION, this.onSocketDisconnection.bind(this));

        this.sessionManager.subscribe(eventNames.CLIENT_LOGGED_IN, this.onUserLogin.bind(this));
        this.sessionManager.subscribe(eventNames.CLIENT_LOGGED_OUT, this.onUserLogout.bind(this));
    }
    onSocketConnection(data) {
        // console.log(`socket ${data.socketId} connected`);
    }
    onSocketDisconnection(data) {
        const {
            user,
            id
        } = data;

        this.sessionManager.removeUser(id, user);
    }
    onUserLogin(data) {
        this.socketManager.sendInfoAboutNewUser(data);
    }
    onUserLogout(data) {
        this.socketManager.sendInfoAboutUserLeft(data);
    }
}

module.exports = new MainManager();