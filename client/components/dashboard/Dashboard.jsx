import React, { Component, PropTypes } from 'react';

import {SOLENOID_CLOSE} from '../../actions/socket';

import Tap from './Tap';
import ActivityList from './ActivityList';
import StatsList from './StatsList';

class Dashboard extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getTaps();
    }

    componentDidUpdate(prevProps) {
        const {socketAction, getTaps} = this.props;

        if (socketAction !== prevProps.socketAction && socketAction === SOLENOID_CLOSE) {
            getTaps();
        }
    }

    render() {
        const {taps} = this.props;

        return (
            <div className="rowFlex">
                <div className="colLg5 colXs12 section-dark">
                    <div className="header">On the Tap</div>
                    {taps.map(tap => {
                        return <Tap key={tap.id} {...tap} />;
                    })}
                </div>
                <div className="colLg7 colXs12">
                    <ActivityList {...this.props} />
                    <StatsList {...this.props} />
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    socketAction: PropTypes.string.isRequired,
    taps: PropTypes.array.isRequired,
    getTaps: PropTypes.func.isRequired
};

export default Dashboard;
