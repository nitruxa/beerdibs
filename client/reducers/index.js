import {combineReducers} from 'redux';

import uiReducer from './ui';
import usersReducer from './users';
import fingerprintReducer from './fingerprint';
import tapReducer from './tap';
import activityReducer from './activity';
import socketReducer from './socket';

const rootReducer = combineReducers({
    uiReducer,
    usersReducer,
    fingerprintReducer,
    tapReducer,
    activityReducer,
    socketReducer
});

export default rootReducer;
