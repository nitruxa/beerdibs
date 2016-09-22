import fetch from '../helpers/fetch';

export const BEER_BRANDS_LOADING = 'beer-brands:loading';
export const BEER_BRANDS_LOADED = 'beer-brands:loaded';

export const BEER_BRAND_CREATED = 'beer-brand:created';
export const BEER_BRAND_SAVED = 'beer-brand:saved';
export const BEER_BRAND_REMOVED = 'beer-brand:removed';

export const getBeerBrands = () => {
    return dispatch => {
        dispatch({type: BEER_BRANDS_LOADING});

        fetch({endpoint: '/api/beer/brands'})
            .then(beerBrands => {
                dispatch({type: BEER_BRANDS_LOADED, beerBrands});
            });
    };
};

export const saveBeerBrand = (beerBrand) => {
    const {id} = beerBrand;

    let endpoint = `/api/beer/brand`;
    let method = 'POST';

    if (id) {
        endpoint += `/${id}`;
        method = 'PUT';
    }

    return dispatch => {
        return fetch({
            endpoint,
            method,
            data: beerBrand
        })
        .then(() => {
            if (id) {
                dispatch({type: BEER_BRAND_SAVED, beerBrand});
            } else {
                dispatch({type: BEER_BRAND_CREATED});
                dispatch(getBeerBrands());
            }
        });
    };
};

export const removeBeerBrand = (id) => {
    return dispatch => {
        fetch({
            endpoint: `/api/beer/brand/${id}`,
            method: 'DELETE'
        })
        .then(() => {
            dispatch({type: BEER_BRAND_REMOVED, id});
        });
    };
};
