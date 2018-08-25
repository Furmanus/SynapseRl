import {
    FETCH_LOGGED_USERS_ERROR,
    FETCH_LOGGED_USERS_START,
    FETCH_LOGGED_USERS_SUCCESS,
    LOGOUT,
    LOGOUT_SUCCESS
} from '../constants/actionTypes';
import {fetchGetData} from '../../common/helpers/ajax_helper';

export function logout () {
    return async dispatch => {
        dispatch({
            type: LOGOUT
        });

        await fetchGetData('/logout');
        dispatch(logoutSuccess());
    }
}
export function fetchLoggedUsers () {
    return async dispatch => {
        dispatch({
            type: FETCH_LOGGED_USERS_START
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
        type: FETCH_LOGGED_USERS_SUCCESS,
        loggedUsers
    }
}
function fetchLoggedUsersError (err) {
    return {
        type: FETCH_LOGGED_USERS_ERROR,
        err
    }
}
function logoutSuccess () {
    window.location = '/login';
    return {
        type: LOGOUT_SUCCESS
    }
}
export function listenToNewUsersConnection () {
    return dispatch => {

    };
}