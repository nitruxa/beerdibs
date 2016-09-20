import fetch from '../helpers/fetch';

export const TAPS_LOADED = 'taps:loaded';

export const getTaps = function () {
    return dispatch => {
        fetch({endpoint: '/api/beer/taps'})
            .then(taps => {
                dispatch({type: TAPS_LOADED, taps});
            });
    };
};
