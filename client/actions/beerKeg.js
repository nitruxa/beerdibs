import fetch from '../helpers/fetch';

export const BEER_KEGS_LOADING = 'beer-kegs:loading';
export const BEER_KEGS_LOADED = 'beer-kegs:loaded';

export const BEER_KEG_CREATED = 'beer-keg:created';
export const BEER_KEG_SAVED = 'beer-keg:saved';
export const BEER_KEG_RESTORED = 'beer-keg:restored';
export const BEER_KEG_REMOVED = 'beer-keg:removed';

export const getBeerKegs = () => {
    return dispatch => {
        dispatch({type: BEER_KEGS_LOADING});

        fetch({endpoint: '/api/beer/kegs'})
            .then(beerKegs => {
                dispatch({type: BEER_KEGS_LOADED, beerKegs});
            });
    };
};

export const saveBeerKeg = (beerKeg) => {
    const {id} = beerKeg;

    let endpoint = `/api/beer/keg`;
    let method = 'POST';

    if (id) {
        endpoint += `/${id}`;
        method = 'PUT';
    }

    return dispatch => {
        return fetch({
            endpoint,
            method,
            data: beerKeg
        })
        .then(() => {
            if (id) {
                dispatch({type: BEER_KEG_SAVED, beerKeg});
            } else {
                dispatch({type: BEER_KEG_CREATED});
                dispatch(getBeerKegs());
            }
        });
    };
};

export const restoreBeerKeg = (id) => {
    return dispatch => {
        fetch({
            endpoint: `/api/beer/keg/${id}/restore`,
            method: 'POST'
        })
        .then(() => {
            dispatch({type: BEER_KEG_RESTORED, id});
        });
    };
};

export const removeBeerKeg = (id) => {
    return dispatch => {
        fetch({
            endpoint: `/api/beer/keg/${id}`,
            method: 'DELETE'
        })
        .then(() => {
            dispatch({type: BEER_KEG_REMOVED, id});
        });
    };
};
