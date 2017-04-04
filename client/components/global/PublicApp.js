import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

import IconHome from 'dibs-vg/dist/react/home';
import IconBeer from 'dibs-vg/dist/react/baby-bottle';
import IconUser from 'dibs-vg/dist/react/account-outlined';

class App extends Component {

    componentDidMount() {
        this.props.connectSocket();
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
        const dashboardIsActive = !this.isActive('/beers') && !this.isActive('/users');

        return (
            <div className="containerFluid boxSizingWrapper">
                <div className="rowFlex">
                    <div className="colLg2 colXs2 right-col">
                        <a href="/" title="">
                            <div className="logo"></div>
                        </a>
                        <div className="menu">
                            <Link className={`menu-item ${dashboardIsActive ? 'is-active' : ''}`} to="/" title="">
                                <IconHome />
                                <span className="menu-text">Dashboard</span>
                            </Link>
                            <Link className={`menu-item ${this.isActive('/beers') ? 'is-active' : ''}`} to="/beers" title="">
                                <IconBeer />
                                <span className="menu-text">Beers</span>
                            </Link>
                            <Link className={`menu-item ${this.isActive('/users') ? 'is-active' : ''}`} to="/users" title="">
                                <IconUser />
                                <span className="menu-text">Users</span>
                            </Link>
                            <a href="/admin" className="menu-item">
                                <span className="menu-text">Admin</span>
                            </a>
                        </div>
                    </div>
                    <div className="colLg10 colXs10">
                        {this.props.children}
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
    }),
    connectSocket: PropTypes.func.isRequired
};

App.contextTypes = {
    router: PropTypes.object.isRequired
};

export default App;
