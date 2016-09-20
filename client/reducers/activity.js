import {ACTIVITY_LOADED} from '../actions/activity';

const defaultState = {
    activities: []
};

const tapReducer = function (state = defaultState, action) {
    switch (action.type) {
        case ACTIVITY_LOADED:
            return Object.assign({}, state, {activities: action.activities});
    }

    return state;
};

export default tapReducer;
