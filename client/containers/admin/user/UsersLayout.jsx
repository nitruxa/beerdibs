import {createElement} from 'react';
import {connect} from 'react-redux';

import UsersLayout from '../../../components/user/UsersLayout';
import UsersLayoutAdminHeaderActions from '../../../components/user/UsersLayoutAdminHeaderActions';
import * as userActions from '../../../actions/user';

const headerActions = createElement(UsersLayoutAdminHeaderActions);

const mapStateToProps = ({usersReducer}) => {
    return {
        users: usersReducer.users,
        headerActions,
        isAdminLayout: true
    };
};

const UsersLayoutContainer = connect(mapStateToProps, userActions)(UsersLayout);

export default UsersLayoutContainer;
