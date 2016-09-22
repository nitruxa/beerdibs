import {connect} from 'react-redux';

import AdminApp from '../../components/global/AdminApp';
import UsersLayout from "../../containers/admin/user/UsersLayout";
import users from './users';

const mapStateToProps = ({uiReducer, socketReducer}) => {
    return Object.assign({}, {ui: uiReducer}, socketReducer);
};

const AppConnected = connect(mapStateToProps)(AdminApp);

const routes = [
    {
        path: '/',
        component: AppConnected,
        indexRoute: {
            component: UsersLayout
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
