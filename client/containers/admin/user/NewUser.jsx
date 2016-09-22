import {connect} from 'react-redux';

import UserForm from '../../../components/user/UserForm';
import * as uiActions from '../../../actions/ui';

import {
    USER_CREATED,
    saveUser,
    removeUser
} from '../../../actions/user';

const mapStateToProps = ({uiReducer}) => {
    return {
        ui: uiReducer,
        stateName: 'user',
        rootUrl: '/users',
        uiActions: {
            created: USER_CREATED
        }
    };
};

const EditUserContainer = connect(mapStateToProps, Object.assign({
    save: saveUser,
    remove: removeUser
}, uiActions))(UserForm);

export default EditUserContainer;
