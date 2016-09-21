import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

import ProfilePhoto from './ProfilePhoto';

class Users extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadUsers();
    }

    render() {
        const {users} = this.props;

        return (
            <div className="rowFlex">
                <div className="colLg5 colXs12  section-dark">
                    <div className="header">
                        Drunkards

                        <Link to="/users/new" style={{color: 'white', float: 'right', fontSize: '12px'}}>
                            Add new user
                        </Link>
                    </div>
                    <div className="content">
                        {users.map(user => {
                            return (
                                <div key={user.id} className="user-wrapper">
                                    <Link to={`/users/${user.id}`} className="user-link" title="2Michaels">
                                        <span className="user-image-wrapper">
                                            <ProfilePhoto profilePhoto={user.profilePhoto} />
                                        </span>
                                        <span className="user-name">{user.displayName}</span>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="colLg7 colXs12 is-scrollable">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Users.propTypes = {
    children: PropTypes.node,
    users: PropTypes.array.isRequired,
    loadUsers: PropTypes.func.isRequired
};

Users.defaultProps = {};

export default Users;
