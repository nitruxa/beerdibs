import React, { Component, PropTypes } from 'react';
import ActivityItem from './ActivityItem';

class ActivityList extends Component {

    componentDidMount() {
        this.props.getActivity();
    }

    render() {
        const {activities} = this.props;

        return (
            <div>
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
    activities: PropTypes.array.isRequired,
    getActivity: PropTypes.func.isRequired
};

export default ActivityList;
