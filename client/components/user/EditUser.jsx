import React, {Component, PropTypes} from 'react';
import UserForm from './UserForm';

class EditUser extends Component {
    constructor(props) {
        super(props);

        this.saveUser = this.saveUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
    }

    componentWillUpdate(nextProps) {
        if (nextProps.params.userId !== this.props.params.userId) {
            this.props.resetUiAction();
        }
    }

    getUserId() {
        const {userId: id} = this.props.params;
        return Number.parseInt(id);
    }

    saveUser(user) {
        this.props.saveUser(Object.assign({id: this.getUserId()}, user));
    }

    removeUser() {
        this.props.removeUser(this.getUserId());
    }

    render() {
        const {ui, resetUiAction, user} = this.props;

        return (
            <div>
                <div className="header">{user.displayName} stats</div>
                <UserForm ui={ui} resetUiAction={resetUiAction} saveUser={this.saveUser} removeUser={this.removeUser} {...user} />
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
    saveUser: PropTypes.func.isRequired,
    removeUser: PropTypes.func.isRequired,
    resetUiAction: PropTypes.func.isRequired
};

export default EditUser;
