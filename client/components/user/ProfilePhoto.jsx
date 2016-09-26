import React, {Component, PropTypes} from 'react';

import IconUser from 'dibs-vg/dist/react/account-outlined';
import PreviewImage from '../global/PreviewImage';

class ProfilePhoto extends Component {
    render() {
        return <PreviewImage image={this.props.profilePhoto} folderPath="/uploads/users" placeholder={<IconUser />} />;
    }
};

ProfilePhoto.propTypes = {
    profilePhoto: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ])
};

export default ProfilePhoto;
