import io from 'socket.io-client';
import autobind from 'autobind-decorator';
import {
    CONNECTION,
    DISCONNECTION,
    NEW_USER_LOGGED,
    USER_DATA
} from '../constants/socket_events';

class SocketHelper {
    constructor() {
        this.socket = io();

        this.attachEvents();
    }
    attachEvents() {
        this.socket.on(CONNECTION, this.onConnect);
        this.socket.on(DISCONNECTION, this.onDisconnect);
        this.socket.on(NEW_USER_LOGGED, this.onNewUserConnection);
    }
    @autobind
    onConnect() {

    }
    @autobind
    onDisconnect() {

    }
    @autobind
    onNewUserConnection(data) {
        console.log(data);
    }
    listenTo(event, callback) {
        this.socket.on(event, callback);
    }
    listenOnce(event, callback) {
        this.socket.once(event, callback);
    }
    stopListening(event) {
        this.socket.off(event);
    }
    emitUserData(username) {
        this.socket.emit(USER_DATA, {
            username
        });
    }
}

const socketHelper = new SocketHelper();

export {socketHelper};