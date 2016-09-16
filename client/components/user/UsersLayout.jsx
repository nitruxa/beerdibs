import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

import IconUser from 'dibs-vg/dist/react/account-outlined';

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
                <div className="colLg5 section-dark">
                    <div className="header">
                        Drunkards

                        <Link to="/users/new" style={{color: 'white', float: 'right', fontSize: '0.6em'}}>
                            Add new user
                        </Link>
                    </div>
                    <div className="content">
                        {users.map(user => {
                            return (
                                <div key={user.id} className="user-wrapper">
                                    <Link to={`/users/${user.id}`} className="user-link" title="2Michaels">
                                        <span className="user-image-wraper">
                                            <img className="user-image" src="https://a.1stdibscdn.com/trade/TRADE_PROFILE/1468509805_tn1sv/thumb/image.jpg" alt="" />
                                        </span>
                                        <span className="user-name">{user.displayName}</span>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="colLg7 section">
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
