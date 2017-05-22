require('../assets/css/base.css');

import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';

import rootReducer from '../reducers/index';
import configureStore from '../helpers/configureStore';

import TapDisplayLayout from '../components/tapDisplay/TapDisplayLayout';

const store = configureStore({rootReducer});

render(
    <Provider store={store}>
        <TapDisplayLayout />
    </Provider>,
    document.getElementById('js-beerdibs-tap-display-app')
);
