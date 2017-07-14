import {TAPS_LOADED, TAP_SAVED} from '../actions/tap';

const defaultState = {
    taps: []
};

const tapReducer = function (state = defaultState, action) {
    let taps = [];

    switch (action.type) {
        case TAPS_LOADED:
            return Object.assign({}, state, {taps: action.taps});

        case TAP_SAVED:
            taps = state.taps.map(tap => {
                if (tap.id === action.tap.id) {
                    tap = action.tap;
                }

                return tap;
            });

            return Object.assign({}, state, {taps});
    }

    return state;
};

export default tapReducer;
