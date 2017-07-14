import fetch from '../helpers/fetch';

export const TAPS_LOADING = 'taps:loading';
export const TAPS_LOADED = 'taps:loaded';
export const TAP_CREATED = 'tap:created';
export const TAP_SAVED = 'tap:saved';

export const getTaps = function () {
    return dispatch => {
        dispatch({type: TAPS_LOADING});

        fetch({endpoint: '/api/beer/taps'})
            .then(taps => {
                dispatch({type: TAPS_LOADED, taps});
            });
    };
};

export const saveTap = (tap) => {
    const {id} = tap;

    let endpoint = `/api/beer/tap`;
    let method = 'POST';

    if (id) {
        endpoint += `/${id}`;
        method = 'PUT';
    }

    return dispatch => {
        return fetch({
            endpoint,
            method,
            data: tap
        })
        .then(() => {
            if (id) {
                dispatch({type: TAP_SAVED, tap});
            } else {
                dispatch({type: TAP_CREATED});
                dispatch(getTaps());
            }
        });
    };
};
