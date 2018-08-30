import {
    ACTION_FETCH_LOGGED_USERS_ERROR,
    ACTION_FETCH_LOGGED_USERS_START,
    ACTION_FETCH_LOGGED_USERS_SUCCESS,
    ACTION_LOGOUT,
    ACTION_LOGOUT_SUCCESS,
    ACTION_NEW_USER_LOGGED_IN,
    ACTION_USER_LOGGED_OUT
} from '../constants/actionTypes';
import {fetchGetData} from '../../common/helpers/ajax_helper';

export function logout () {
    return async dispatch => {
        dispatch({
            type: ACTION_LOGOUT
        });

        await fetchGetData('/logout');
        dispatch(logoutSuccess());
    }
}
export function fetchLoggedUsers () {
    return async dispatch => {
        dispatch({
            type: ACTION_FETCH_LOGGED_USERS_START
        });

        try {
            const loggedUsers = await fetchGetData('/users_online');

            dispatch(fetchLoggedUsersSuccess(loggedUsers.users));
        } catch (err) {
            dispatch(fetchLoggedUsersError(err));
        }
    }
}
function fetchLoggedUsersSuccess (loggedUsers) {
    return {
        type: ACTION_FETCH_LOGGED_USERS_SUCCESS,
        loggedUsers
    }
}
function fetchLoggedUsersError (err) {
    return {
        type: ACTION_FETCH_LOGGED_USERS_ERROR,
        err
    }
}
function logoutSuccess () {
    window.location = '/login';
    return {
        type: ACTION_LOGOUT_SUCCESS
    }
}
export function onNewUserLogin(id, user) {
    return {
        type: ACTION_NEW_USER_LOGGED_IN,
        id,
        user
    };
}

export function onUserLogout(id, user) {
    return {
        type: ACTION_USER_LOGGED_OUT,
        id,
        user
    };
}