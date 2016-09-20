import React, {Component, PropTypes} from 'react';
import {USER_SAVED} from '../../actions/user';
import IconUser from 'dibs-vg/dist/react/account-outlined';

class UserForm extends Component {
    constructor(props) {
        super(props);

        const {displayName, email, slackName} = props;

        this.state = {
            displayName, email, slackName
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.removeUser = this.removeUser.bind(this);
    }

    componentWillReceiveProps({displayName, email, slackName}) {
        this.setState({
            displayName, email, slackName
        });
    }

    componentWillUnmount() {
        this.props.resetUiAction();
    }

    onChange(event) {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.saveUser(this.state);
    }

    removeUser(event) {
        event.preventDefault();

        const deleteUser = confirm("Are you sure?");
        if (deleteUser === true) {
            this.props.removeUser();
        }
    }

    getDeleteUserButton() {
        const {id} = this.props;

        if (id) {
            return <button className="button--secondary button-small" onClick={this.removeUser} type="reset">Remove User</button>
        }

        return null;
    }

    render() {
        const {ui} = this.props;
        const {displayName = '', email = '', slackName = ''} = this.state;
        const header = displayName ? displayName : 'Add User';
        const isSaved = ui.action === USER_SAVED;

        return (
            <div>
                <div className="overlay" style={{display: 'none'}}>
                    <div className="modal">
                        <div className="modal-content">
                            <div className="modal-header">Remove user</div>
                            Are you sure that you want to {displayName}?
                        </div>
                        <div className="modal-actions">
                            <button className="button--secondary" type="submit">Cancel</button>
                            <button className="button--primary" type="submit">Save</button>
                        </div>
                    </div>
                </div>
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
