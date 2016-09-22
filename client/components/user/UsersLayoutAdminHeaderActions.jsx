import React, {Component} from 'react';
import {Link} from 'react-router';

class UsersLayoutAdminHeaderActions extends Component {
    render() {
        return (
            <Link to="/users/new" style={{color: 'white', float: 'right', fontSize: '12px'}}>
                Add new user
            </Link>
        );
    }
}

export default UsersLayoutAdminHeaderActions;
