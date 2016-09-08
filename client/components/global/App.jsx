import React, { Component, PropTypes } from 'react';

import IconHome from 'dibs-vg/dist/react/home';
import IconBeer from 'dibs-vg/dist/react/baby-bottle';
import IconUser from 'dibs-vg/dist/react/account-outlined';

import connectSocket from '../../helpers/connectSocket';

import css from '../../assets/css/base.css';

class App extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        connectSocket();
    }

    render() {
        return (
            <div className="containerFluid boxSizingWrapper">
                <div className="rowFlex">
                    <div className="colLg2 right-col">
                        <div className="logo"></div>
                        <div className="menu">
                            <a className="menu-item is-active" href="#" title=""><IconHome />Dashboard
                            </a>
                            <a className="menu-item" href="#" title=""><IconBeer />Beers</a>
                            <a className="menu-item" href="#" title=""><IconUser />Users</a>
                        </div>
                    </div>
                    <div className="colLg10">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {};

App.defaultProps = {};

export default App;
