import {connect} from 'react-redux';

import PublicApp from '../../components/global/PublicApp';
import Dashboard from '../../containers/Dashboard';
import users from './users';

import {connectSocket} from '../../actions/socket';

const mapStateToProps = ({uiReducer, socketReducer}) => {
    return Object.assign({}, {ui: uiReducer}, socketReducer);
};

const AppConnected = connect(mapStateToProps, {connectSocket})(PublicApp);

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
