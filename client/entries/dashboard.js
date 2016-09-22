require('../assets/css/base.css');

import React from 'react';
import {Provider} from 'react-redux';
import {createHistory} from 'history';
import {Router, useRouterHistory} from 'react-router';
import {render} from 'react-dom';

import rootReducer from '../reducers/index';
import router from '../router/public';
import configureStore from '../helpers/configureStore';

require('../assets/css/base.css');

const store = configureStore({rootReducer});
const browserHistory = useRouterHistory(createHistory)();

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={router} />
    </Provider>,
    document.getElementById('js-beerdibs-dashboard-app')
);
