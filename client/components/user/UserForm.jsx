import React, {Component, PropTypes} from 'react';
import {USER_SAVED} from '../../actions/user';

import IconUser from 'dibs-vg/dist/react/account-outlined';
import ConfirmModal from '../global/ConfirmModal';

class UserForm extends Component {
    constructor(props) {
        super(props);

        const {displayName, email, slackName} = props;

        this.state = {
            user: {displayName, email, slackName},
            removeConfirmIsOpen: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.openConfirmModal = this.openConfirmModal.bind(this);
        this.closeConfirmModal = this.closeConfirmModal.bind(this);
    }

    componentWillReceiveProps({displayName, email, slackName}) {
        this.setState({
            user: {displayName, email, slackName}
        });
    }

    componentWillUnmount() {
        this.props.resetUiAction();
    }

    onChange(event) {
        const {name, value} = event.target;
        const userState = this.state.user;
        userState[name] = value;
        this.setState({user: userState});
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.saveUser(this.state.user);
    }

    openConfirmModal() {
        this.setState({removeConfirmIsOpen: true});
    }

    closeConfirmModal() {
        this.setState({removeConfirmIsOpen: false});
    }

    getDeleteUserButton() {
        const {id, removeUser} = this.props;
        const {removeConfirmIsOpen, user: {displayName}} = this.state;

        if (id) {
            return (
                <span>
                    <button className="button--secondary button-small"
                        onClick={this.openConfirmModal} type="button">
                        Remove User
                    </button>
                    <ConfirmModal isOpen={removeConfirmIsOpen}
                        copy={{header: 'Remove user', cancel: 'Cancel', confirm: 'Remove'}}
                        onCancel={this.closeConfirmModal}
                        onConfirm={removeUser}>
                        Are you sure you want to remove {displayName}?
                    </ConfirmModal>
                </span>
            );
        }

        return null;
    }

    render() {
        const {ui} = this.props;
        const {displayName = '', email = '', slackName = ''} = this.state.user;
        const header = displayName ? displayName : 'Add User';
        const isSaved = ui.action === USER_SAVED;

        return (
            <div>
                <div className="header">{header}</div>
                <form onSubmit={this.onSubmit}>
                    <div className="section">
                        <div className="content">
                            <div className="user-image-profile">
                                <span className="user-image-wrapper">
                                    <IconUser />
                                </span>
                            </div>
                            <div className="actions">
                                {this.getDeleteUserButton()}
                                <button className="button--primary button-small" type="submit">Edit Photo</button>
                            </div>
                        </div>
                    </div>
                    <div className="section">
                        <div className="header">User Details</div>
                        <div className="content">
                            <div className="field-item">
                                <input className="field-item-intput" name="displayName" value={displayName} onChange={this.onChange} placeholder="Name" type="text" />
                            </div>
                            <div className="field-item">
                                <input className="field-item-intput" name="email" value={email} onChange={this.onChange} placeholder="Email" type="email" />
                            </div>
                            <div className="field-item">
                                <input className="field-item-intput" name="slackName" value={slackName} onChange={this.onChange} placeholder="Slack name" type="text" />
                            </div>

                            {(() => {
                                if (isSaved) {
                                    return (
                                        <div className="form-notify form-notify--success">
                                            SAVED!
                                        </div>
                                    );
                                }
                            })()}
                            <div className="actions">
                                <button className="button--primary" type="submit">Save</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

UserForm.propTypes = {
    ui: React.PropTypes.shape({
        action: React.PropTypes.string.isRequired
    }),

    id: PropTypes.number,
    displayName: PropTypes.string,
    email: PropTypes.string,
    slackName: PropTypes.string,

    saveUser: PropTypes.func.isRequired,
    removeUser: PropTypes.func.isRequired,
    resetUiAction: PropTypes.func.isRequired
};

export default UserForm;
