import {combineReducers} from 'redux';

import uiReducer from './ui';
import usersReducer from './users';
import fingerprintReducer from './fingerprint';
import socketReducer from './socket';

const rootReducer = combineReducers({
    uiReducer,
    usersReducer,
    fingerprintReducer,
    socketReducer
});

export default rootReducer;
