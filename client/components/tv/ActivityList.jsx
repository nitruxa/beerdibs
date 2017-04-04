import React, { PropTypes } from 'react';

import ProfilePhoto from '../user/ProfilePhoto';
import style from './ActivityList.css';

export default function ActivityList({activities}) {
    return (
        <div className={style.list}>
            {activities.map(activity => (
                <div key={activity.id} className={style.item}>
                    <div>
                        <div className={style.photo}>
                            <ProfilePhoto profilePhoto={activity.user.profilePhoto} />
                        </div>
                    </div>
                    <div className={style.userName}>{activity.user.displayName}</div>
                    <div>
                        <div className={style.labelWrapper}>
                            <img className={style.label} src={`/uploads/beerBrands/${activity.beerKed.beerBrand.label}`} />
                        </div>
                    </div>
                    <div className={style.volume}>{activity.volume}ml</div>
                </div>
            ))}
        </div>
    );
}

ActivityList.propTypes = {
    activities: PropTypes.array
};
