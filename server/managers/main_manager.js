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
        this.socketManager.subscribe(socketEvents.USER_DATA, this.onSocketUserData.bind(this));

        this.sessionManager.subscribe(eventNames.CLIENT_LOGGED_IN, this.onUserLogin.bind(this));
    }
    onSocketConnection(data) {
        // console.log(`socket ${data.socketId} connected`);
    }
    onSocketDisconnection(data) {
        // console.log(`socket ${data.socketId} disconnected`);
    }
    onSocketUserData(data) {

    }
    onUserLogin(data) {
        const {
            user
        } = data;

        this.socketManager.sendInfoAboutNewUser(user);
    }
}

module.exports = new MainManager();