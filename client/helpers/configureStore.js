import {createStore, applyMiddleware} from 'redux';
import effects from 'redux-effects';
// import multi from 'redux-multi';
import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

let middleware = [effects/*, multi*/, promiseMiddleware, thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
    const loggerMiddleware = createLogger();
    middleware = [...middleware, loggerMiddleware];
}

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

export default function configureStore({rootReducer, initialState}) {
    return createStoreWithMiddleware(rootReducer, initialState);
}
