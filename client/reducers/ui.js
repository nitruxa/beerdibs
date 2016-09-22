import {RESET_UI_ACTION} from '../actions/ui';

import {
    USERS_LOADING,
    USERS_LOADED,
    USER_CREATED,
    USER_SAVED,
    USER_REMOVED
} from '../actions/user';

import {
    BEER_BRANDS_LOADING,
    BEER_BRANDS_LOADED,
    BEER_BRAND_SAVED,
    BEER_BRAND_CREATED,
    BEER_BRAND_REMOVED
} from '../actions/beerBrand';

const initialState = {
    action: ''
};

const uiReducer = function (state = initialState, action) {
    switch (action.type) {
        case USERS_LOADING:
        case USERS_LOADED:
        case USER_CREATED:
        case USER_SAVED:
        case USER_REMOVED:
        case BEER_BRANDS_LOADING:
        case BEER_BRANDS_LOADED:
        case BEER_BRAND_SAVED:
        case BEER_BRAND_CREATED:
        case BEER_BRAND_REMOVED:
            return {action: action.type};

        case RESET_UI_ACTION:
            return initialState;
    }

    return state;
};

export default uiReducer;
