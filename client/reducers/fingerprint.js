import {
    USER_FINGERPRINTS_LOADING,
    USER_FINGERPRINTS_LOADED,
    USER_FINGERPRINT_REMOVED
} from '../actions/fingerprint';

const initialState = {
    userFingerprints: []
};

const fingerprintsReducer = function (state = initialState, action) {
    switch (action.type) {
        case USER_FINGERPRINTS_LOADING:
            return Object.assign({}, state, {userFingerprints: []});

        case USER_FINGERPRINTS_LOADED:
            return Object.assign({}, state, {userFingerprints: action.fingerprints});

        case USER_FINGERPRINT_REMOVED:
            const fingerprintIndex = state.userFingerprints.findIndex(f => f.id === action.id);
            const fingerprints = [
                ...state.userFingerprints.slice(0, fingerprintIndex),
                ...state.userFingerprints.slice(fingerprintIndex + 1, state.userFingerprints.length)
            ];

            return Object.assign({}, state, {userFingerprints: fingerprints});
    }

    return state;
};

export default fingerprintsReducer;
