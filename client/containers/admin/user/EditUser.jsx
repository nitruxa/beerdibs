import {connect} from 'react-redux';

import * as uiActions from '../../../actions/ui';

import {
    USER_SAVED,
    USER_CREATED,
    USER_REMOVED,
    saveUser,
    removeUser
} from '../../../actions/user';

import * as fingerprintActions from '../../../actions/fingerprint';

import EditUser from '../../../components/user/EditUser';

const mapStateToProps = ({uiReducer, usersReducer, fingerprintReducer}, {params}) => {
    const userId = Number.parseInt(params.id);
    const user = usersReducer.users.find(u => u.id === userId) || {};

    return {
        ui: uiReducer,
        user,
        fingerprints: fingerprintReducer.userFingerprints,
        formProps: {
            stateName: 'user',
            rootUrl: '/users',
            uiActions: {
                created: USER_CREATED,
                saved: USER_SAVED,
                removed: USER_REMOVED
            },
            copy: {
                removeButton: 'Remove user',
                removeConfirmHeader: 'Remove user',
                removeConfirmMessage: `Are you sure you want to remove ${user.name}?`
            }
        }
    };
};

const EditUserContainer = connect(
    mapStateToProps,
    Object.assign({
        save: saveUser,
        remove: removeUser
    }, fingerprintActions, uiActions)
)(EditUser);

export default EditUserContainer;
