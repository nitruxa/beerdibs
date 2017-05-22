import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import {
    // FINGER_FOUND,
    // BEER_POUR,
    SOLENOID_CLOSE,
    connectSocket
} from '../../actions/socket';

import {getTaps} from '../../actions/tap';

import style from './TapDisplay.css';
// import tapStyle from './TapDisplayTaps.css';

import Taps from '../global/Taps';
import BeerPourOverlay from '../global/BeerPourOverlay';

const tapStyle = {};

class TapDisplay extends Component {

    componentDidMount() {
        this.props.connectSocket();
        this.props.getTaps();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.socketAction !== SOLENOID_CLOSE && nextProps.socketAction === SOLENOID_CLOSE) {
            this.props.getTaps();
        }
    }

    render() {
        const {taps} = this.props;
        return (
            <div className={style.container}>
                <div className={style.taps}>
                    <div className={style.header}>1stdibs <small>Vilnius Pub</small></div>
                    <div className={style.tapsWrapper}>
                        <Taps taps={taps} style={tapStyle} />
                    </div>
                </div>
                <BeerPourOverlay {...this.props} />
            </div>
        );
    }
}

TapDisplay.propTypes = {
    taps: PropTypes.array,
    ui: React.PropTypes.shape({
        action: React.PropTypes.string.isRequired
    }),
    connectSocket: PropTypes.func.isRequired,
    getTaps: PropTypes.func.isRequired,
    socketAction: PropTypes.string
};

const mapStateToProps = ({socketReducer, tapReducer}) => {
    return {
        socketAction: socketReducer.action,
        fingerPrint: socketReducer.fingerPrint,
        beerTaps: socketReducer.beerTaps,
        taps: tapReducer.taps
    };
};

export default connect(
    mapStateToProps,
    {
        connectSocket,
        getTaps
    }
)(TapDisplay);
