import React, {Component} from 'react';
import {Link} from 'react-router';

class BeerKegsAdminHeaderActions extends Component {
    render() {
        return (
            <Link to="/beer-kegs/new" style={{color: 'white', float: 'right', fontSize: '12px'}}>
                Add new keg
            </Link>
        );
    }
}

export default BeerKegsAdminHeaderActions;
