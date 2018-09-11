import {
    ACTION_CREATE_GAME_SUCCESS,
    ACTION_FETCH_LOGGED_USERS_START,
    ACTION_FETCH_LOGGED_USERS_SUCCESS,
    ACTION_FETCH_USER_GAMES,
    ACTION_FETCH_USER_GAMES_FAILURE,
    ACTION_FETCH_USER_GAMES_SUCCESS,
    ACTION_LOGOUT,
    ACTION_NEW_USER_LOGGED_IN, ACTION_SELECT_ACTIVE_GAME,
    ACTION_SELECT_GAME,
    ACTION_SELECT_USER,
    ACTION_USER_LOGGED_OUT,
} from '../constants/actionTypes';
import {sortLoggedUsers} from '../utils/utils';

const initialState = {
    loggedUsers: [],
    userGames: [],
    isFetchingLoggedUsers: false,
    isFetchingUserGames: false,
    selectedUser: null,
    selectedGame: null,
    activeGameId: null
};

export function dashboardReducer (state = initialState, action) {
    let user;
    let newLoggedUsers;
    let newUserGames;
    let id;

    switch (action.type) {
        case ACTION_LOGOUT:
            return state;
        case ACTION_FETCH_LOGGED_USERS_START:
            return {
                ...state,
                isFetchingLoggedUsers: true
            };
        case ACTION_FETCH_LOGGED_USERS_SUCCESS:
            return {
                ...state,
                loggedUsers: sortLoggedUsers(action.loggedUsers),
                isFetchingLoggedUsers: false
            };
        case ACTION_NEW_USER_LOGGED_IN:
            user = action.user;
            id = action.id;
            newLoggedUsers = Array.slice(state.loggedUsers);
            newLoggedUsers.push({user, id});

            return {
                ...state,
                loggedUsers: sortLoggedUsers(newLoggedUsers)
            };
        case ACTION_USER_LOGGED_OUT:
            user = action.user;
            id = action.id;
            newLoggedUsers = Array.slice(state.loggedUsers);

            newLoggedUsers = newLoggedUsers.filter(item => {
                return !(user === item.user);
            });

            return {
                ...state,
                loggedUsers: sortLoggedUsers(newLoggedUsers)
            };
        case ACTION_SELECT_USER:
            return {
                ...state,
                selectedUser: action.user,
                selectedGame: null
            };
        case ACTION_SELECT_GAME:
            return {
                ...state,
                selectedUser: null,
                selectedGame: action.game
            };
        case ACTION_CREATE_GAME_SUCCESS:
            newUserGames = Array.slice(state.userGames);
            newUserGames.push(action.game);

            return {
                ...state,
                userGames: newUserGames
            };
        case ACTION_FETCH_USER_GAMES:
            return {
                ...state,
                isFetchingUserGames: true
            };
        case ACTION_FETCH_USER_GAMES_SUCCESS:
            return {
                ...state,
                isFetchingUserGames: false,
                userGames: action.userGames
            };
        case ACTION_FETCH_USER_GAMES_FAILURE:
            return {
                ...state,
                isFetchingUserGames: false
            };
        case ACTION_SELECT_ACTIVE_GAME:
            return {
                ...state,
                activeGameId: action.gameId
            };
        default:
            return state;
    }
}