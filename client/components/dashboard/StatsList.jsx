import React, { Component, PropTypes } from 'react';

import {SOLENOID_CLOSE} from '../../actions/socket';
import StatsItem from './StatsItem';

class StatsList extends Component {

    componentDidMount() {
        this.props.getLastMonthStats();
    }

    componentDidUpdate(prevProps) {
        const {socketAction, getLastMonthStats} = this.props;

        if (socketAction !== prevProps.socketAction && socketAction === SOLENOID_CLOSE) {
            getLastMonthStats();
        }
    }

    render() {
        const {stats} = this.props;

        return (
            <div className="section">
                <div className="header">Top consumers this month</div>
                <div className="content">
                    {stats.map(user => {
                        return <StatsItem key={user.id} {...user} />;
                    })}
                </div>
            </div>
        );
    }
}

StatsList.propTypes = {
    socketAction: PropTypes.string.isRequired,
    stats: PropTypes.array.isRequired,
    getLastMonthStats: PropTypes.func.isRequired
};

export default StatsList;
