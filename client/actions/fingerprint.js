import fetch from '../helpers/fetch';

export const USER_FINGERPRINTS_LOADING = 'user:fingerpints:loading';
export const USER_FINGERPRINTS_LOADED = 'user:fingerpints:loaded';
export const USER_FINGERPRINT_REMOVED = 'user:fingerpint:removed';

export const getUserFingerprints = function (userId) {
    return dispatch => {
        dispatch({type: USER_FINGERPRINTS_LOADING});

        fetch({endpoint: `/api/user/${userId}/fingerprint`})
            .then(fingerprints => {
                dispatch({type: USER_FINGERPRINTS_LOADED, fingerprints});
            });
    };
};

export const addFingerprint = function (userId) {
    return dispatch => {
        fetch({
            endpoint: `/api/user/fingerprint`,
            method: 'POST',
            data: {
                userId
            }
        })
        .then(() => getUserFingerprints(userId)(dispatch));
    };
};

export const removeFingerprint = function (id) {
    return dispatch => {
        fetch({
            endpoint: `/api/user/fingerprint/${id}`,
            method: 'DELETE'
        })
        .then(() => dispatch({type: USER_FINGERPRINT_REMOVED, id}));
    };
};
