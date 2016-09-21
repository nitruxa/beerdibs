import React, {Component, PropTypes} from 'react';

import IconUser from 'dibs-vg/dist/react/account-outlined';

class ProfilePhoto extends Component {
    render() {
        const {profilePhoto} = this.props;

        if (profilePhoto) {
            return <img src={profilePhoto} style={{width: '100%'}} />;
        } else {
            return <IconUser />;
        }
    }
};

ProfilePhoto.propTypes = {
    profilePhoto: PropTypes.string
};

export default ProfilePhoto;
