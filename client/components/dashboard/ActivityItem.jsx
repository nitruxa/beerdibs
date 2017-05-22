import React, { Component, PropTypes } from 'react';
import ProfilePhoto from '../user/ProfilePhoto';
import formatDate from '../../helpers/formatDate';

class ActivityItem extends Component {
    render() {
        const {user, volume, beerKed: {beerBrand}, date} = this.props;

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
                <span className="user-time">{formatDate(date)}</span>
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
