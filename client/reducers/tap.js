import {TAPS_LOADED} from '../actions/tap';

const defaultState = {
    taps: []
};

const tapReducer = function (state = defaultState, action) {
    switch (action.type) {
        case TAPS_LOADED:
            return Object.assign({}, state, {taps: action.taps});
    }

    return state;
};

export default tapReducer;
