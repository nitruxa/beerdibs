import fetch from '../helpers/fetch';

export const ACTIVITY_LOADED = 'activity:loaded';

export const getActivity = function () {
    return dispatch => {
        fetch({endpoint: '/api/user/activity'})
            .then(activities => {
                dispatch({type: ACTIVITY_LOADED, activities});
            });
    };
};
