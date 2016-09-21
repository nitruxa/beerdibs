import {
    ACTIVITY_LOADED,
    STATS_LOADED
} from '../actions/activity';

const defaultState = {
    activities: [],
    stats: []
};

const tapReducer = function (state = defaultState, action) {
    switch (action.type) {
        case ACTIVITY_LOADED:
            return Object.assign({}, state, {activities: action.activities});

        case STATS_LOADED:
            return Object.assign({}, state, {stats: action.stats});
    }

    return state;
};

export default tapReducer;
