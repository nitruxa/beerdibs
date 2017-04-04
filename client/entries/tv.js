require('../assets/css/base.css');

import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';

import rootReducer from '../reducers/index';
import configureStore from '../helpers/configureStore';

import TvLayout from '../components/tv/TvLayout';

const store = configureStore({rootReducer});

render(
    <Provider store={store}>
        <TvLayout />
    </Provider>,
    document.getElementById('js-beerdibs-tv-app')
);
