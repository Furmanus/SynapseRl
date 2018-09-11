import {
    ACTION_CREATE_GAME,
    ACTION_CREATE_GAME_FAILURE,
    ACTION_CREATE_GAME_SUCCESS,
    ACTION_FETCH_LOGGED_USERS_ERROR,
    ACTION_FETCH_LOGGED_USERS_START,
    ACTION_FETCH_LOGGED_USERS_SUCCESS,
    ACTION_FETCH_USER_GAMES,
    ACTION_FETCH_USER_GAMES_FAILURE,
    ACTION_FETCH_USER_GAMES_SUCCESS,
    ACTION_LOGOUT,
    ACTION_LOGOUT_SUCCESS, ACTION_SELECT_ACTIVE_GAME,
    ACTION_NEW_USER_LOGGED_IN,
    ACTION_SELECT_GAME,
    ACTION_SELECT_USER,
    ACTION_USER_LOGGED_OUT
} from '../constants/actionTypes';
import {fetchGetData, fetchPostData} from '../../../common/helpers/ajax_helper';

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
export function onNewUserLogin (id, user) {
    return {
        type: ACTION_NEW_USER_LOGGED_IN,
        id,
        user
    };
}
export function onUserLogout (id, user) {
    return {
        type: ACTION_USER_LOGGED_OUT,
        id,
        user
    };
}
export function setSelectedUser (user) {
    return {
        type: ACTION_SELECT_USER,
        user
    };
}
export function setSelectedGame (game) {
    return {
        type: ACTION_SELECT_GAME,
        game
    };
}
export function createGame (userId) {
    return async dispatch => {
        dispatch({
            type: ACTION_CREATE_GAME
        });

        try {
            const createGameResult = await fetchPostData('/create_game', {
                userId
            });

            dispatch(createGameSuccess(createGameResult));
        } catch (err) {
            dispatch(createGameFailure(err));
        }
    }
}
function createGameSuccess (response) {
    return {
        type: ACTION_CREATE_GAME_SUCCESS,
        game: response
    };
}
function createGameFailure (error) {
    return {
        type: ACTION_CREATE_GAME_FAILURE,
        error
    };
}
export function fetchUserGames (userId) {
    return async dispatch => {
        dispatch({
            type: ACTION_FETCH_USER_GAMES
        });

        try {
            const userGames = await fetchGetData('/user_games');

            dispatch(fetchUserGamesSuccess(userGames));
        } catch (err) {
            dispatch(fetchUserGamesFailure(err));
        }
    }
}
function fetchUserGamesSuccess (userGames) {
    return {
        type: ACTION_FETCH_USER_GAMES_SUCCESS,
        userGames
    };
}
function fetchUserGamesFailure (error) {
    return {
        type: ACTION_FETCH_USER_GAMES_FAILURE,
        error
    };
}
export function selectGame (game) {
    return {
        type: ACTION_SELECT_GAME,
        game
    };
}
export function selectActiveGame (gameId) {
    return {
        type: ACTION_SELECT_ACTIVE_GAME,
        gameId
    }
}