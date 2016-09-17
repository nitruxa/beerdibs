import React, {Component, PropTypes} from 'react';

import UserForm from './UserForm';
import UserFingerprints from './UserFingerprints';

class EditUser extends Component {
    constructor(props) {
        super(props);

        this.saveUser = this.saveUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
    }

    componentDidMount() {
        const userId = this.getUserId(this.props);
        this.props.getUserFingerprints(userId);
    }

    componentWillUpdate(nextProps) {
        const userId = nextProps.params.userId;
        if (userId !== this.props.params.userId) {
            this.props.resetUiAction();
            this.props.getUserFingerprints(userId);
        }
    }

    getUserId(props) {
        const {userId: id} = props.params;
        return Number.parseInt(id);
    }

    saveUser(user) {
        const props = this.props;
        props.saveUser(Object.assign({id: this.getUserId(props)}, user));
    }

    removeUser() {
        const props = this.props;
        props.removeUser(this.getUserId(props));
    }

    render() {
        const {
            ui,
            resetUiAction,
            user,
            fingerprints,
            addFingerprint,
            removeFingerprint
        } = this.props;

        return (
            <div>
                <div className="header">{user.displayName} stats</div>
                <UserForm ui={ui}
                    resetUiAction={resetUiAction}
                    saveUser={this.saveUser}
                    removeUser={this.removeUser}
                    {...user} />
                <UserFingerprints userId={user.id}
                    fingerprints={fingerprints}
                    add={addFingerprint}
                    remove={removeFingerprint} />
            </div>
        );
    }
}

EditUser.propTypes = {
    params: PropTypes.object.isRequired,
    ui: React.PropTypes.shape({
        action: React.PropTypes.string.isRequired
    }),
    user: PropTypes.object.isRequired,
    fingerprints: PropTypes.array.isRequired,
    saveUser: PropTypes.func.isRequired,
    removeUser: PropTypes.func.isRequired,
    resetUiAction: PropTypes.func.isRequired,

    getUserFingerprints: PropTypes.func.isRequired,
    addFingerprint: PropTypes.func.isRequired,
    removeFingerprint: PropTypes.func.isRequired
};

export default EditUser;