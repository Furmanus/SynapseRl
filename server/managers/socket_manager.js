const socketEvents = require('../constants/socket_events');
const Observable = require('observable-lc');

class SocketManager extends Observable {
    initialize(io) {
        this.io = io;
        this.mapSocketIdToUser = new Map();

        this.attachEvents();
    }
    attachEvents() {
        this.io.on(socketEvents.CONNECTION, socket => {
            this.publish(socketEvents.CONNECTION, {
                socketId: socket.id
            });

            socket.on(socketEvents.USER_DATA, this.onUserDataEvent.bind(this, socket.id));
        });
        this.io.on(socketEvents.DISCONNECTION, socket => {
            this.publish(socketEvents.DISCONNECTION, {
                socketId: socket.id
            });
        });
    }
    onUserDataEvent(socketId, data) {
        const extendedData = {
            ...data,
            socketId
        };
        this.publish(socketEvents.USER_DATA, extendedData);
        this.mapSocketIdToUser.set(data.username, socketId);
    }
    sendInfoAboutNewUser(username) {
        this.io.emit(socketEvents.NEW_USER_LOGGED, {
            username
        });
    }
}

module.exports = new SocketManager();