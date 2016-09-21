import React, { Component, PropTypes } from 'react';
import StatsItem from './StatsItem';

class StatsList extends Component {

    componentDidMount() {
        this.props.getLastMonthStats();
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
    stats: PropTypes.array.isRequired,
    getLastMonthStats: PropTypes.func.isRequired
};

export default StatsList;
