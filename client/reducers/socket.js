import {
    FINGER_FOUND,
    BEER_POUR,
    SOLENOID_CLOSE
} from '../actions/socket';

const defaultState = {
    action: '',
    fingerPrint: null,
    beerTaps: {}
};

const socketReducer = function (state = defaultState, {type, payload}) {
    switch (type) {
        case FINGER_FOUND:
            return Object.assign({}, state, {
                fingerPrint: payload.fingerPrint,
                action: type
            });
        case BEER_POUR:
            const beerTaps = Object.assign({}, state.beerTaps, {
                [payload.beerTapPosition]: payload.beerPoured
            });

            return Object.assign({}, state, {
                action: type,
                beerTaps
            });

        case SOLENOID_CLOSE:
            return Object.assign({}, defaultState, {
                action: type
            });
    }

    return state;
};

export default socketReducer;
