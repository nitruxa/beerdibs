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
        connectSocket(this.onSocket);
    }

    onSocket(payload) {
        switch (payload.event) {
            case 'finger:found':

                break;
            case 'beer:pour':

                break;

            case 'solenoid:close':

                break;
        }
    }

    render() {
        return (
            // <div className="overlay">
            //     <div className="tap-notification">
            //         <div className="tap-beer"></div>
            //         <div class="tap-user">
            //             Irma pouring Angurio Koja
            //             <span className="tap-puored">0.4 l</span>
            //         </div>
            //     </div>
            // </div>
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
        );
    }
}

App.propTypes = {};

App.defaultProps = {};

export default App;
