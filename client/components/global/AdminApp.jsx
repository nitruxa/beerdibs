import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

import IconBeer from 'dibs-vg/dist/react/baby-bottle';
import IconUser from 'dibs-vg/dist/react/account-outlined';

import {
    USER_CREATED,
    USER_REMOVED
} from '../../actions/user';

class App extends Component {

    componentWillReceiveProps(nextProps) {
        const {router} = this.context;
        const nextAction = nextProps.ui.action;
        const prevAction = this.props.ui.action;

        if (prevAction !== nextAction) {
            switch (nextAction) {
                case USER_CREATED:
                case USER_REMOVED:
                    router.replace('/users');
                    break;
            }
        }
    }

    isActive(...args) {
        let active = false;

        args.forEach(url => {
            const r = new RegExp(url);
            const testPassed = r.test(this.props.location.pathname);
            if (!active && testPassed) {
                active = true;
            }
        });

        return active;
    }

    render() {
        const usersIsActive = !this.isActive('/beers') || this.isActive('/users');

        return (
            <div>
                <div className="containerFluid boxSizingWrapper">
                    <div className="rowFlex">
                        <div className="colLg2 colXs2 right-col">
                            <a href="/" title="">
                                <div className="logo"></div>
                            </a>
                            <div className="menu">
                                <Link className={`menu-item ${this.isActive('/beers') ? 'is-active' : ''}`} to="/beers" title="">
                                    <IconBeer />
                                    <span className="menu-text">Beers</span>
                                </Link>
                                <Link className={`menu-item ${usersIsActive ? 'is-active' : ''}`} to="/users" title="">
                                    <IconUser />
                                    <span className="menu-text">Users</span>
                                </Link>
                                <a href="/admin/logout" className="menu-item">
                                    <span className="menu-text">Log out</span>
                                </a>
                            </div>
                        </div>
                        <div className="colLg10 colXs10">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    location: PropTypes.object.isRequired,
    children: PropTypes.node,
    ui: React.PropTypes.shape({
        action: React.PropTypes.string.isRequired
    })
};

App.contextTypes = {
    router: PropTypes.object.isRequired
};

export default App;
