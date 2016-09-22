import React, {Component} from 'react';
import {Link} from 'react-router';

class UsersLayoutAdminHeaderActions extends Component {
    render() {
        return (
            <Link to="/beer-brands/new" style={{color: 'white', float: 'right', fontSize: '12px'}}>
                Add new brand
            </Link>
        );
    }
}

export default UsersLayoutAdminHeaderActions;
