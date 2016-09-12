import {combineReducers} from 'redux';

import globalReducer from './global';
import socketReducer from './socket';

const rootReducer = combineReducers({
    globalReducer,
    socketReducer
});

export default rootReducer;
