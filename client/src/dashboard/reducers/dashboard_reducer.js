import {
    ACTION_FETCH_LOGGED_USERS_START,
    ACTION_FETCH_LOGGED_USERS_SUCCESS,
    ACTION_LOGOUT,
    ACTION_NEW_USER_LOGGED_IN,
    ACTION_USER_LOGGED_OUT,
} from '../constants/actionTypes';
import {sortLoggedUsers} from '../utils/utils';

const initialState = {
    loggedUsers: [],
    isFetchingLoggedUsers: false
};

export function dashboardReducer (state = initialState, action) {
    let user;
    let newLoggedUsers;
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
        default:
            return state;
    }
}