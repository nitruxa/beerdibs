import {connect} from 'react-redux';

import UserForm from '../../../components/user/UserForm';
import * as userActions from '../../../actions/user';

const mapStateToProps = ({uiReducer}) => {
    return {
        ui: uiReducer
    };
};

const EditUserContainer = connect(mapStateToProps, userActions)(UserForm);

export default EditUserContainer;
