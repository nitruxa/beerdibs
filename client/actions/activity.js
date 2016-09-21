import moment from 'moment';
import fetch from '../helpers/fetch';

export const ACTIVITY_LOADED = 'activity:loaded';
export const STATS_LOADED = 'stats:loaded';

export const getActivity = function (limit) {
    return dispatch => {
        fetch({endpoint: '/api/user/activity', data: {limit}})
            .then(activities => {
                dispatch({type: ACTIVITY_LOADED, activities});
            });
    };
};

export const getLastMonthStats = function () {
    const currentDate = new Date();
    const lastMonthDate = moment(currentDate).format('YYYY-MM-01T00:00Z');

    return dispatch => {
        fetch({endpoint: '/api/user/stats', data: {
            filter: {
                'userBeers.date': {
                    logicalOperator: '>',
                    value: lastMonthDate
                }
            }
        }})
        .then(stats => {
            dispatch({type: STATS_LOADED, stats});
        });
    };
};
