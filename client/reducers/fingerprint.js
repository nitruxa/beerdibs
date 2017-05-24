import {
    USER_FINGERPRINTS_LOADING,
    USER_FINGERPRINTS_LOADED,
    USER_FINGERPRINT_ADDED,
    USER_FINGERPRINT_REMOVED,

    STATUS_PENDING,
    STATUS_SCAN,
    STATUS_ACTIVE
} from '../actions/fingerprint';

import {
    FINGER_SCANNER_ACTIVATED,
    FINGER_SAVED,
    FINGER_EVENT
} from '../actions/socket';

const initialState = {
    userFingerprints: []
};

const mapStatus = function (id, fingerprints, status) {
    return fingerprints.map(f => {
        if (f.id === Number.parseInt(id)) {
            f.status = status;
        }

        return f;
    });
};

const fingerprintsReducer = function (state = initialState, action) {
    let userFingerprints = [];

    switch (action.type) {
        case USER_FINGERPRINTS_LOADING:
            return Object.assign({}, state, {userFingerprints: []});

        case USER_FINGERPRINTS_LOADED:
            return Object.assign({}, state, {userFingerprints: action.fingerprints});

        case USER_FINGERPRINT_ADDED:
            const {user, id} = action;
            userFingerprints = state.userFingerprints.slice(0);
            userFingerprints.push(Object.assign({}, {user}, {id, status: STATUS_PENDING}));
            return Object.assign({}, state, {userFingerprints});

        case USER_FINGERPRINT_REMOVED:
            const fingerprintIndex = state.userFingerprints.findIndex(f => f.id === action.id);
            const fingerprints = [
                ...state.userFingerprints.slice(0, fingerprintIndex),
                ...state.userFingerprints.slice(fingerprintIndex + 1, state.userFingerprints.length)
            ];

            return Object.assign({}, state, {userFingerprints: fingerprints});

        // case FINGER_SCANNER_ACTIVATED:
        //     userFingerprints = mapStatus(action.payload.id, state.userFingerprints, STATUS_SCAN);
        //     return Object.assign({}, state, userFingerprints);

        case FINGER_SAVED:
            userFingerprints = mapStatus(action.payload.id, state.userFingerprints, STATUS_ACTIVE);
            return Object.assign({}, state, userFingerprints);

        case FINGER_EVENT:
            userFingerprints = mapStatus(action.payload.id, state.userFingerprints, action.payload.message);
            return Object.assign({}, state, userFingerprints);
    }

    return state;
};

export default fingerprintsReducer;
