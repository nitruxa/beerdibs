import moment from 'moment';

import React, { Component, PropTypes } from 'react';
import ProfilePhoto from '../user/ProfilePhoto';

class ActivityItem extends Component {
    render() {
        const {user, volume, beerKed: {beerBrand}, date} = this.props;
        const today = moment(new Date()).format('YYYY-MM-DDT00:00Z');
        const diffDays = moment(moment(date).format('YYYY-MM-DDT00:00Z')).diff(today, 'days');
        const dateFormat = diffDays < 0 ? (diffDays > -7 ? 'ddd HH:mm' : 'MMM DD HH:mm') : 'HH:mm';
        const dateFormatted = moment(date).format(dateFormat);

        return (
            <div className="user-wrapper">
                <span className="user-link">
                    <span className="user-image-wrapper">
                        <ProfilePhoto profilePhoto={user.profilePhoto} />
                    </span>
                    <span className="user-name">
                        {user.displayName} poured {volume}ml of {beerBrand.name}
                    </span>
                </span>
                <span className="user-time">{dateFormatted}</span>
            </div>
        );
    }
}

ActivityItem.propTypes = {
    user: PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        profilePhoto: PropTypes.string
    }),
    volume: PropTypes.number.isRequired,
    beerKed: PropTypes.shape({
        beerBrand: PropTypes.shape({
            name: PropTypes.string.isRequired
        })
    }),
    date: PropTypes.string.isRequired
};

export default ActivityItem;
