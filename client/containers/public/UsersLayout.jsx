import {connect} from 'react-redux';

import UsersLayout from '../../components/user/UsersLayout';
import * as userActions from '../../actions/user';

const mapStateToProps = ({usersReducer}) => {
    return {
        users: usersReducer.users
    };
};

const UsersLayoutContainer = connect(mapStateToProps, userActions)(UsersLayout);

export default UsersLayoutContainer;
