import React, { Component, PropTypes } from 'react';
import ProfilePhoto from '../user/ProfilePhoto';

class ActivityItem extends Component {
    render() {
        const {displayName, profilePhoto, volumeTotal} = this.props;

        return (
            <div className="user-wrapper">
                <span className="user-link">
                    <span className="user-image-wrapper">
                        <ProfilePhoto profilePhoto={profilePhoto} />
                    </span>
                    <span className="user-name">
                        {displayName}
                    </span>
                </span>
                <span className="user-time">{Number(volumeTotal / 1000).toFixed(2)}l</span>
            </div>
        );
    }
}

ActivityItem.propTypes = {
    displayName: PropTypes.string.isRequired,
    profilePhoto: PropTypes.string,
    volumeTotal: PropTypes.number.isRequired
};

export default ActivityItem;
