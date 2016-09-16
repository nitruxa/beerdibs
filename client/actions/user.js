import fetch from '../helpers/fetch';

export const USERS_LOADING = 'users:loading';
export const USERS_LOADED = 'users:loaded';

export const USER_CREATED = 'user:created';
export const USER_SAVED = 'user:saved';
export const USER_REMOVED = 'user:removed';

export const loadUsers = () => {
    return dispatch => {
        dispatch({type: USERS_LOADING});

        fetch({endpoint: '/api/users'})
            .then(users => {
                dispatch({type: USERS_LOADED, users});
            });
    };
};

export const saveUser = (user) => {
    const {id} = user;

    let endpoint = `/api/user`;
    let method = 'POST';

    if (id) {
        endpoint += `/${id}`;
        method = 'PUT';
    }

    return dispatch => {
        return fetch({
            endpoint,
            method,
            data: user
        })
        .then(() => {
            if (id) {
                dispatch({type: USER_SAVED, user});
            } else {
                dispatch({type: USER_CREATED});
                dispatch(loadUsers());
            }
        });
    };
};

export const removeUser = (id) => {
    return dispatch => {
        fetch({
            endpoint: `/api/user/${id}`,
            method: 'DELETE'
        })
        .then(() => {
            dispatch({type: USER_REMOVED, id});
        });
    };
};
