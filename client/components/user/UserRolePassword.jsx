import React, {Component, PropTypes} from 'react';

class UserRolePassword extends Component {

    getPasswordFields() {
        const {role, password, onChange} = this.props;

        if (role === 'admin') {
            return (
                <div>
                    <div className="field-item">
                        <input className="field-item-intput" name="password" onChange={onChange} value={password} placeholder="Password" type="password" />
                    </div>
                </div>
            );
        }

        return null;
    }

    render() {
        const {role, onChange} = this.props;

        return (
            <div>
                <div className="field-item">
                    <select className="field-item-intput" name="role" value={role} onChange={onChange}>
                        <option value="user">Basic user</option>
                        <option value="admin">Administrator</option>
                    </select>
                </div>

                {this.getPasswordFields()}
            </div>
        );
    }
}

UserRolePassword.propTypes = {
    role: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

UserRolePassword.defaultProps = {
    role: 'user'
};

export default UserRolePassword;
