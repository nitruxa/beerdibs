import React, {Component, PropTypes} from 'react';

import UserFingerprintRow from './UserFingerprintRow';

class UserFingerprints extends Component {
    constructor(props) {
        super(props);

        this.addFingerprint = this.addFingerprint.bind(this);
    }

    addFingerprint() {
        const {user, add} = this.props;
        add(user);
    }

    render() {
        const {fingerprints} = this.props;

        return (
            <div className="section">
                <div className="header">Fingerprints</div>
                <div className="list">
                    {fingerprints.map(fingerprint => {
                        return <UserFingerprintRow key={fingerprint.id} {...fingerprint} remove={this.props.remove} />;
                    })}
                </div>
                <div className="actions">
                    <button className="button--primary" onClick={this.addFingerprint}>Add fingerprint</button>
                </div>
            </div>
        );
    }
}

UserFingerprints.propTypes = {
    user: PropTypes.object.isRequired,
    fingerprints: PropTypes.array.isRequired,

    add: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
};

export default UserFingerprints;
