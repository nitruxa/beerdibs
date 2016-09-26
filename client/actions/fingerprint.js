import fetch from '../helpers/fetch';

export const USER_FINGERPRINTS_LOADING = 'user:fingerpints:loading';
export const USER_FINGERPRINTS_LOADED = 'user:fingerpints:loaded';
export const USER_FINGERPRINT_ADDED = 'user:fingerpint:add';
export const USER_FINGERPRINT_REMOVED = 'user:fingerpint:removed';

export const STATUS_PENDING = 'pending';
export const STATUS_SCAN = 'scan';
export const STATUS_ACTIVE = 'active';

export const getUserFingerprints = function (userId) {
    return dispatch => {
        dispatch({type: USER_FINGERPRINTS_LOADING});

        fetch({endpoint: `/api/user/${userId}/fingerprint`})
            .then(fingerprints => {
                dispatch({type: USER_FINGERPRINTS_LOADED, fingerprints});
            });
    };
};

export const addFingerprint = function (user) {
    return dispatch => {
        fetch({
            endpoint: `/api/user/fingerprint`,
            method: 'POST',
            data: {
                userId: user.id
            }
        })
        .then(({id}) => dispatch({
            type: USER_FINGERPRINT_ADDED,
            user: user,
            id
        }));
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
