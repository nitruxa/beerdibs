import React, { Component, PropTypes } from 'react';

import IconHome from 'dibs-vg/dist/react/home';
import IconBeer from 'dibs-vg/dist/react/baby-bottle';
import IconUser from 'dibs-vg/dist/react/account-outlined';

import connectSocket from '../../helpers/connectSocket';

import css from '../../assets/css/base.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            overlayVisible: false,
            user: null,
            beerPoured: 0
        };

        this.onSocket = this.onSocket.bind(this);
    }

    componentDidMount() {
        connectSocket(this.onSocket);
    }

    onSocket(payload) {
        switch (payload.event) {
            case 'finger:found':
                this.setState({
                    overlayVisible: true,
                    user: payload.data.fingerPrint
                });

                break;
            case 'beer:pour':
                this.setState({
                    beerPoured: payload.data.beerPoured
                });
                break;

            case 'solenoid:close':
                this.setState({
                    overlayVisible: false,
                    user: null,
                    beerPoured: 0
                });
                break;
        }
    }

    render() {
        const {overlayVisible, user, beerPoured} = this.state;

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

                {(() => {
                    if (overlayVisible) {
                        return (
                            <div className="overlay" style={{display: 'flex', alignItems: 'center', fontSize: '60px'}}>
                                <div className="tap-notification" style={{margin: '0 auto', display: 'flex', alignItems: 'center'}}>
                                    <div className="beer-tap">
                                        <div className="beer-tap-pic" style={{width: '290px', height: '615px'}} />
                                        <div className="beer-tap-name">Kronenbourg Blanc</div>
                                    </div>
                                    <div className="tap-user" style={{color: 'white', textAlign: 'center', paddingLeft: '50px'}}>
                                    {(() => {
                                        if (beerPoured) {
                                            return (
                                                <div>
                                                    {user.displayName} has poured
                                                    <div className="tap-puored" style={{fontSize: '2em'}}>{beerPoured} ml</div>
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div>
                                                    {user.displayName}<br />is about to get drunk!
                                                </div>
                                            );
                                        }
                                    })()}
                                    </div>
                                </div>
                            </div>
                        );
                    }
                })()}
            </div>
        );
    }
}

App.propTypes = {};

App.defaultProps = {};

export default App;
