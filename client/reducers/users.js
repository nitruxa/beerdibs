import {USERS_LOADED, USER_SAVED, USER_REMOVED} from '../actions/user';

const initialState = {
    users: []
};

const sortUsers = function (a, b) {
    if (a.displayName < b.displayName) {
        return -1;
    } else if (a.displayName > b.displayName) {
        return 1;
    }

    return 0;
};

const usersReducer = function (state = initialState, action) {
    let users = [];

    switch (action.type) {
        case USERS_LOADED:
            return Object.assign({}, state, {users: action.users.sort(sortUsers)});

        case USER_SAVED:
            users = state.users.map(user => {
                if (user.id === action.user.id) {
                    user = action.user;
                }

                return user;
            }).sort(sortUsers);

            return Object.assign({}, state, {users});

        case USER_REMOVED:
            const userIndex = state.users.findIndex(user => user.id === action.id);
            users = [
                ...state.users.slice(0, userIndex),
                ...state.users.slice(userIndex + 1, state.users.length)
            ];

            return Object.assign({}, state, {users});
    }

    return state;
};

export default usersReducer;
