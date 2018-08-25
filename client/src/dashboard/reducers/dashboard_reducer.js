import {FETCH_LOGGED_USERS_START, FETCH_LOGGED_USERS_SUCCESS, LOGOUT} from '../constants/actionTypes';

const initialState = {
    loggedUsers: [],
    isFetchingLoggedUsers: false
};

export function dashboardReducer (state = initialState, action) {
    switch (action.type) {
        case LOGOUT:
            return state;
        case FETCH_LOGGED_USERS_START:
            return {
                ...state,
                isFetchingLoggedUsers: true
            };
        case FETCH_LOGGED_USERS_SUCCESS:
            return {
                ...state,
                loggedUsers: action.loggedUsers,
                isFetchingLoggedUsers: false
            };
        default:
            return state;
    }
}