import io from 'socket.io-client';
import autobind from 'autobind-decorator';
import {
    CONNECTION,
    DISCONNECTION,
    NEW_USER_LOGGED,
    USER_LOGGED_OUT
} from '../constants/socket_events';
import {store} from '../../dashboard/dashboard';
import {
    onNewUserLogin,
    onUserLogout
} from '../../dashboard/actions/dashboardActions';

class SocketHelper{
    constructor() {
        this.socket = io();

        this.attachEvents();
    }
    attachEvents() {
        this.socket.on(CONNECTION, this.onConnect);
        this.socket.on(DISCONNECTION, this.onDisconnect);
        this.socket.on(NEW_USER_LOGGED, this.onNewUserConnection);
        this.socket.on(USER_LOGGED_OUT, this.onUserDisconnection);
    }
    @autobind
    onConnect() {

    }
    @autobind
    onDisconnect() {

    }
    @autobind
    onNewUserConnection(data) {
        const {
            user,
            id
        } = data;

        store.dispatch(onNewUserLogin(id, user));
    }
    @autobind
    onUserDisconnection(data) {
        const {
            user,
            id
        } = data;

        store.dispatch(onUserLogout(id, user));
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
}

const socketHelper = new SocketHelper();

export {socketHelper};