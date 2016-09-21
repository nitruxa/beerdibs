import React, { Component, PropTypes } from 'react';
import ActivityItem from './ActivityItem';

class ActivityList extends Component {

    componentDidMount() {
        this.props.getActivity(this.props.limit);
    }

    render() {
        const {activities} = this.props;

        return (
            <div className="section">
                <div className="header">Activity</div>
                <div className="content">
                    {activities.map(activity => {
                        return <ActivityItem key={activity.id} {...activity} />;
                    })}
                </div>
            </div>
        );
    }
}

ActivityList.propTypes = {
    limit: PropTypes.number,
    activities: PropTypes.array.isRequired,
    getActivity: PropTypes.func.isRequired
};

ActivityList.defaultProps = {
    limit: 10
};

export default ActivityList;
