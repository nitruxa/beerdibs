import {combineReducers} from 'redux';

import uiReducer from './ui';
import usersReducer from './users';
import fingerprintReducer from './fingerprint';
import activityReducer from './activity';
import socketReducer from './socket';

import tapReducer from './tap';
import beerBrandReducer from './beerBrand';

const rootReducer = combineReducers({
    uiReducer,
    usersReducer,
    fingerprintReducer,
    activityReducer,
    socketReducer,
    tapReducer,
    beerBrandReducer
});

export default rootReducer;
