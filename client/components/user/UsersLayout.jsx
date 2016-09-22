import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

import ProfilePhoto from './ProfilePhoto';

class UsersLayout extends Component {

    componentDidMount() {
        this.props.loadUsers();
    }

    render() {
        const {users, headerActions} = this.props;

        return (
            <div className="rowFlex">
                <div className="colLg5 colXs12  section-dark">
                    <div className="header">
                        Drunkards
                        {headerActions}
                    </div>
                    <div className="content">
                        {users.map(user => {
                            return (
                                <div key={user.id} className="user-wrapper">
                                    <Link to={`/users/${user.id}`} className="user-link" title={user.displayName}>
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

UsersLayout.propTypes = {
    children: PropTypes.node,
    headerActions: PropTypes.node,
    users: PropTypes.array.isRequired,
    loadUsers: PropTypes.func.isRequired
};

UsersLayout.defaultProps = {};

export default UsersLayout;
