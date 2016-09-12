import React, { Component, PropTypes } from 'react';

import IconHome from 'dibs-vg/dist/react/home';
import IconBeer from 'dibs-vg/dist/react/baby-bottle';
import IconUser from 'dibs-vg/dist/react/account-outlined';

import BeerPourOverlay from './BeerPourOverlay';

require('../../assets/css/base.css');

class App extends Component {

    componentDidMount() {
        this.props.connectSocket();
    }

    render() {
        return (
            <div>
                <div className="containerFluid boxSizingWrapper">
                    <div className="rowFlex">
                        <div className="colLg2 colXs2 right-col">
                            <div className="logo"></div>
                            <div className="menu">
                                <a className="menu-item" href="/" title=""><IconHome />Dashboard
                                </a>
                                <a className="menu-item" href="/beers" title=""><IconBeer />Beers</a>
                                <a className="menu-item" href="/users" title=""><IconUser />Users</a>
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
    connectSocket: PropTypes.func.isRequired,
    children: PropTypes.node
};

export default App;
