import {RESET_UI_ACTION} from '../actions/ui';

import {
    USERS_LOADING,
    USERS_LOADED,
    USER_CREATED,
    USER_SAVED,
    USER_REMOVED
} from '../actions/user';

const initialState = {
    action: ''
};

const uiReducer = function (state = initialState, action) {
    switch (action.type) {
        case USERS_LOADING:
        case USERS_LOADED:
        case USER_CREATED:
        case USER_SAVED:
        case USER_REMOVED:
            return {action: action.type};

        case RESET_UI_ACTION:
            return initialState;
    }

    return state;
};

export default uiReducer;
