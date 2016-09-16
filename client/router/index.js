import {connect} from 'react-redux';

import App from '../components/global/App';
import Dashboard from '../containers/Dashboard';
import users from './users';

import {connectSocket} from '../actions/socket';

const mapStateToProps = ({uiReducer, socketReducer}) => {
    return Object.assign({}, {ui: uiReducer}, socketReducer);
};

const AppConnected = connect(mapStateToProps, {connectSocket})(App);

const routes = [
    {
        path: '/',
        component: AppConnected,
        indexRoute: {
            component: Dashboard
        },
        childRoutes: [
            ...users
        ]
    },
    {
        path: '*',
        component: AppConnected
    }
];

export default routes;
