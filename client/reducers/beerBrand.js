import {BEER_BRANDS_LOADED, BEER_BRAND_SAVED, BEER_BRAND_REMOVED} from '../actions/beerBrand';

const initialState = {
    beerBrands: []
};

const sortBrands = function (a, b) {
    if (a.name < b.name) {
        return -1;
    } else if (a.name > b.name) {
        return 1;
    }

    return 0;
};

const beerBrandReducer = function (state = initialState, action) {
    let beerBrands = [];

    switch (action.type) {
        case BEER_BRANDS_LOADED:
            return Object.assign({}, state, {beerBrands: action.beerBrands.sort(sortBrands)});

        case BEER_BRAND_SAVED:
            action.beerBrand.label = `${action.beerBrand.id}_label?${new Date().getTime()}`;
            beerBrands = state.beerBrands.map(beerBrand => {
                if (beerBrand.id === action.beerBrand.id) {
                    beerBrand = action.beerBrand;
                }

                return beerBrand;
            }).sort(sortBrands);

            return Object.assign({}, state, {beerBrands});

        case BEER_BRAND_REMOVED:
            const userIndex = state.beerBrands.findIndex(beerBrand => beerBrand.id === action.id);
            beerBrands = [
                ...state.beerBrands.slice(0, userIndex),
                ...state.beerBrands.slice(userIndex + 1, state.beerBrands.length)
            ];

            return Object.assign({}, state, {beerBrands});
    }

    return state;
};

export default beerBrandReducer;
