import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {
    // FINGER_FOUND,
    // BEER_POUR,
    SOLENOID_CLOSE,
    connectSocket
} from '../../actions/socket';

import {getTaps} from '../../actions/tap';
import {getActivity, getLastMonthStats} from '../../actions/activity';

import style from './TvLayout.css';

import Taps from './Taps';
import ActivityList from './ActivityList';
import BeerPourOverlay from './BeerPourOverlay';

class TvLayout extends Component {

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
    }

    render() {
        const {taps, activities} = this.props;
        return (
            <div className={style.container}>
                <div className={style.taps}>
                    <div className={style.header}>1stdibs <small>Vilnius Pub</small></div>
                    <div className={style.tapsWrapper}>
                        <Taps taps={taps} />
                    </div>
                </div>
                <div className={style.stats}>
                    <div className={style.activityHeader}>Activity</div>
                    <ActivityList activities={activities} />
                </div>

                <BeerPourOverlay {...this.props} />
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
    getActivity: PropTypes.func.isRequired
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
