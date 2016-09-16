import {combineReducers} from 'redux';

import uiReducer from './ui';
import usersReducer from './users';
import socketReducer from './socket';

const rootReducer = combineReducers({
    uiReducer,
    usersReducer,
    socketReducer
});

export default rootReducer;
