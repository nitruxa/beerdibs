import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Sound from 'react-sound';

import {
    // FINGER_FOUND,
    // BEER_POUR,
    SOLENOID_CLOSE,
    connectSocket
} from '../../actions/socket';

import {getTaps} from '../../actions/tap';
import {getActivity, getLastMonthStats} from '../../actions/activity';

import style from './TvLayout.css';
import tapsStyle from './TvTaps.css';

import Taps from '../global/Taps';
import BeerPourOverlay from '../global/BeerPourOverlay';
import ActivityList from './ActivityList';

class TvLayout extends Component {

    constructor() {
        super();
        this.state = {
            playStatus: Sound.status.STOPPED
        };
    }

    componentDidMount() {
        this.props.connectSocket();
        this.props.getTaps();
        this.props.getActivity(6);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.socketAction !== SOLENOID_CLOSE && nextProps.socketAction === SOLENOID_CLOSE) {
            // console.log(SOLENOID_CLOSE);
            this.props.getTaps();
            this.props.getActivity(6);
        }

        if (!this.props.fingerPrint && nextProps.fingerPrint) {
            this.setState({playStatus: Sound.status.PLAYING});
        }
    }

    render() {
        const {playStatus} = this.state;
        const {taps, activities} = this.props;
        return (
            <div className={style.container}>
                <div className={style.taps}>
                    <div className={style.header}>1stdibs <small>Vilnius Pub</small></div>
                    <div className={style.tapsWrapper}>
                        <Taps taps={taps} style={tapsStyle} />
                    </div>
                </div>
                <div className={style.stats}>
                    <div className={style.activityHeader}>Activity</div>
                    <ActivityList activities={activities} />
                </div>

                <BeerPourOverlay {...this.props} />
                <Sound
                    url="/public/can-open.wav"
                    playStatus={playStatus}
                    onFinishedPlaying={() => this.setState({playStatus: Sound.status.STOPPED})}
                />
            </div>
        );
    }
}

TvLayout.propTypes = {
    taps: PropTypes.array,
    activities: PropTypes.array,
    ui: React.PropTypes.shape({
        action: React.PropTypes.string.isRequired
    }),
    connectSocket: PropTypes.func.isRequired,
    getTaps: PropTypes.func.isRequired,
    getActivity: PropTypes.func.isRequired,
    socketAction: PropTypes.string
};

const mapStateToProps = ({socketReducer, tapReducer, activityReducer}) => {
    return {
        socketAction: socketReducer.action,
        fingerPrint: socketReducer.fingerPrint,
        beerTaps: socketReducer.beerTaps,
        taps: tapReducer.taps,
        activities: activityReducer.activities,
        stats: activityReducer.stats
    };
};

export default connect(
    mapStateToProps,
    {
        connectSocket,
        getTaps,
        getActivity,
        getLastMonthStats
    }
)(TvLayout);
