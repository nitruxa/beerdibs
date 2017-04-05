import React, {/*Component,*/ PropTypes} from 'react';

import Form from '../global/Form';

import ProfilePhoto from './ProfilePhoto';
import UserRolePassword from './UserRolePassword';

class UserForm extends Form {

    getStateProps(props) {
        const {displayName, email, slackName, profilePhoto, role, password = ''} = props;
        return {displayName, email, slackName, profilePhoto, role, password};
    }

    render() {
        const {displayName = '', email = '', slackName = '', profilePhoto = ''} = this.state.user;
        const header = displayName ? displayName : 'Add User';

        return (
            <div>
                <div className="header">{header}</div>
                <form onSubmit={this.onSubmit}>
                    <div className="section">
                        <div className="content">
                            <div className="user-image-profile">
                                <span className="user-image-wrapper">
                                    <ProfilePhoto profilePhoto={profilePhoto} />
                                </span>
                            </div>
                            <div className="actions">
                                {this.getDeleteButton()}
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
                                <input className="field-item-intput"
                                    name="profilePhoto"
                                    onChange={this.onChangeFile}
                                    placeholder="Profile photo"
                                    type="file" />
                            </div>
                            <div className="field-item">
                                <input className="field-item-intput" name="email" value={email} onChange={this.onChange} placeholder="Email" type="email" />
                            </div>
                            <div className="field-item">
                                <input className="field-item-intput" name="slackName" value={slackName} onChange={this.onChange} placeholder="Slack name" type="text" />
                            </div>

                            <UserRolePassword {...this.state.user} onChange={this.onChange} />
                            {this.isSaved() && (
                                <div className="form-notify form-notify--success">
                                    SAVED!
                                </div>
                            )}
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
    profilePhoto: PropTypes.string,
    email: PropTypes.string,
    slackName: PropTypes.string,

    save: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    resetUiAction: PropTypes.func.isRequired
};

export default UserForm;
