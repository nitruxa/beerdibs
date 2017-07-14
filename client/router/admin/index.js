import {connect} from 'react-redux';

import AdminApp from '../../components/global/AdminApp';
import UsersLayout from "../../containers/admin/user/UsersLayout";

import users from './users';
import beerBrands from './beerBrands';
import beerKegs from './beerKegs';
import taps from './taps';

import {connectSocket} from '../../actions/socket';

const mapStateToProps = ({uiReducer, socketReducer}) => {
    return Object.assign({}, {ui: uiReducer}, socketReducer);
};

const AppConnected = connect(mapStateToProps, {connectSocket})(AdminApp);

const routes = [
    {
        path: '/',
        component: AppConnected,
        indexRoute: {
            component: UsersLayout
        },
        childRoutes: [
            ...beerBrands,
            ...beerKegs,
            ...taps,
            ...users
        ]
    },
    {
        path: '*',
        component: AppConnected
    }
];

export default routes;
