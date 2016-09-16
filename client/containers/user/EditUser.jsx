import {connect} from 'react-redux';

import * as uiActions from '../../actions/ui';
import * as userActions from '../../actions/user';

import EditUser from '../../components/user/EditUser';

const mapStateToProps = ({uiReducer, usersReducer}, {params}) => {
    const userId = Number.parseInt(params.userId);

    return {
        ui: uiReducer,
        user: usersReducer.users.find(u => u.id === userId) || {}
    };
};

const EditUserContainer = connect(
    mapStateToProps,
    Object.assign(userActions, uiActions)
)(EditUser);

export default EditUserContainer;
