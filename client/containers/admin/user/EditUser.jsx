import {connect} from 'react-redux';

import * as uiActions from '../../../actions/ui';
import * as userActions from '../../../actions/user';
import * as fingerprintActions from '../../../actions/fingerprint';

import EditUser from '../../../components/user/EditUser';

const mapStateToProps = ({uiReducer, usersReducer, fingerprintReducer}, {params}) => {
    const userId = Number.parseInt(params.userId);

    return {
        ui: uiReducer,
        user: usersReducer.users.find(u => u.id === userId) || {},
        fingerprints: fingerprintReducer.userFingerprints
    };
};

const EditUserContainer = connect(
    mapStateToProps,
    Object.assign(userActions, fingerprintActions, uiActions)
)(EditUser);

export default EditUserContainer;
