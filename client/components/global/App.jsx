import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

import IconHome from 'dibs-vg/dist/react/home';
import IconBeer from 'dibs-vg/dist/react/baby-bottle';
import IconUser from 'dibs-vg/dist/react/account-outlined';

import BeerPourOverlay from './BeerPourOverlay';

import {
    USER_CREATED,
    USER_REMOVED
} from '../../actions/user';

require('../../assets/css/base.css');

class App extends Component {

    componentDidMount() {
        this.props.connectSocket();
    }

    componentWillReceiveProps(nextProps) {
        const {history} = this.context;
        const nextAction = nextProps.ui.action;
        const prevAction = this.props.ui.action;

        if (prevAction !== nextAction) {
            switch (nextAction) {
                case USER_CREATED:
                case USER_REMOVED:
                    history.replace('/users');
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
        const dashboardIsActive = !this.isActive('/beers', '/users');

        return (
            <div>
                <div className="containerFluid boxSizingWrapper">
                    <div className="rowFlex">
                        <div className="colLg2 colXs2 right-col">
                            <div className="logo"></div>
                            <div className="menu">
                                <Link className={`menu-item ${dashboardIsActive ? 'is-active' : ''}`} to="/" title=""><IconHome />Dashboard</Link>
                                <Link className={`menu-item ${this.isActive('/beers') ? 'is-active' : ''}`} to="/beers" title=""><IconBeer />Beers</Link>
                                <Link className={`menu-item ${this.isActive('/users') ? 'is-active' : ''}`} to="/users" title=""><IconUser />Users</Link>
                            </div>
                        </div>
                        <div className="colLg10 colXs10">
                            {this.props.children}
                        </div>
                    </div>
                </div>

                <BeerPourOverlay {...this.props} />
            </div>
        );
    }
}

App.propTypes = {
    location: PropTypes.object.isRequired,
    children: PropTypes.node,
    ui: React.PropTypes.shape({
        action: React.PropTypes.string.isRequired
    }),
    connectSocket: PropTypes.func.isRequired
};

App.contextTypes = {
    history: PropTypes.object.isRequired
};

export default App;
