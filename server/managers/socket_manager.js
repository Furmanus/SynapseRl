const socketEvents = require('../constants/socket_events');
const Observable = require('observable-lc');
const logger = require('../utils/logger');
const log = logger.logDevelopment;

class SocketManager extends Observable {
    initialize(io) {
        this.io = io;

        this.attachEvents();
    }
    attachEvents() {
        this.io.on(socketEvents.CONNECTION, socket => {
            log(`${socket.handshake.session.user} socket with socket id ${socket.id} connected`);
            this.publish(socketEvents.CONNECTION, {
                socketId: socket.id
            });

            socket.on(socketEvents.DISCONNECTION, () => {
                const {
                    user,
                    id
                } = socket.handshake.session;

                log(`${user} socket with socket id ${socket.id} disconnected`);
                this.publish(socketEvents.DISCONNECTION, {
                    id,
                    user
                });
            });
        });
    }
    sendInfoAboutNewUser(data) {
        log(`${data.user} enters game socket event emited.`);
        this.io.sockets.emit(socketEvents.NEW_USER_LOGGED, data);
    }
    sendInfoAboutUserLeft(data) {
        log(`${data.user} leaves game socket event emited.`);
        this.io.emit(socketEvents.USER_LOGGED_OUT, data);
    }
}

module.exports = new SocketManager();