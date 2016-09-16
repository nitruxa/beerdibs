import React, {Component, PropTypes} from 'react';
import {USER_SAVED} from '../../actions/user';

class UserForm extends Component {
    constructor(props) {
        super(props);

        const {displayName, email, slackName, fingerprints = []} = props;

        this.state = {
            displayName, email, slackName, fingerprints
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.removeUser = this.removeUser.bind(this);
    }

    componentWillReceiveProps({displayName, email, slackName, fingerprints = []}) {
        this.setState({
            displayName, email, slackName, fingerprints
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
            return <button className="button--secondary" onClick={this.removeUser} type="reset">Remove</button>
        }

        return null;
    }

    render() {
        const {ui} = this.props;
        const {displayName = '', email = '', slackName = '', fingerprints = []} = this.state;

        const isSaved = ui.action === USER_SAVED;

        return (
            <form onSubmit={this.onSubmit}>
                <div className="header">User Form</div>
                {(() => {
                    if (isSaved) {
                        return (
                            <div>
                                SAVED!
                            </div>
                        );
                    }
                })()}
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

                    {/*fingerprints.map(fingerprint => {
                        return (
                            <div key={fingerprint.id}>
                                {fingerprint.id}
                            </div>
                        );
                    })*/}

                    <div className="actions">
                        <button className="button--primary" type="submit">Save</button>
                        {this.getDeleteUserButton()}
                    </div>
                </div>
            </form>
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
    fingerprints: PropTypes.array,

    saveUser: PropTypes.func.isRequired,
    removeUser: PropTypes.func.isRequired,
    resetUiAction: PropTypes.func.isRequired
};

export default UserForm;
