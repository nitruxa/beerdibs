import {BEER_KEGS_LOADED, BEER_KEG_SAVED, BEER_KEG_RESTORED, BEER_KEG_REMOVED} from '../actions/beerKeg';

const initialState = {
    beerKegs: []
};

const sortKegs = function (a, b) {
    if (a.purchaseDate < b.purchaseDate) {
        return 1;
    } else if (a.purchaseDate > b.purchaseDate) {
        return -1;
    }

    return 0;
};

const beerBrandReducer = function (state = initialState, action) {
    let beerKegs = [];

    switch (action.type) {
        case BEER_KEGS_LOADED:
            return Object.assign({}, state, {beerKegs: action.beerKegs.sort(sortKegs)});

        case BEER_KEG_SAVED:
            beerKegs = state.beerKegs.map(beerKeg => {
                if (beerKeg.id === action.beerKeg.id) {
                    beerKeg = action.beerKeg;
                }

                return beerKeg;
            }).sort(sortKegs);

            return Object.assign({}, state, {beerKegs});

        case BEER_KEG_RESTORED:
            beerKegs = state.beerKegs.map(beerKeg => {
                if (beerKeg.id === action.id) {
                    beerKeg.active = 1;
                }

                return beerKeg;
            }).sort(sortKegs);

            return Object.assign({}, state, {beerKegs});

        case BEER_KEG_REMOVED:
            beerKegs = state.beerKegs.map(beerKeg => {
                if (beerKeg.id === action.id) {
                    beerKeg.active = 0;
                }

                return beerKeg;
            }).sort(sortKegs);

            return Object.assign({}, state, {beerKegs});
    }

    return state;
};

export default beerBrandReducer;
