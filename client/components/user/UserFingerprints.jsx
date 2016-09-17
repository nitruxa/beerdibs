import React, {Component, PropTypes} from 'react';

class UserFingerprints extends Component {
    constructor(props) {
        super(props);

        this.addFingerprint = this.addFingerprint.bind(this);
    }

    addFingerprint() {
        const {userId, add} = this.props;
        add(userId);
    }

    removeFingerprint(id) {
        this.props.remove(id);
    }

    render() {
        const {fingerprints} = this.props;

        return (
            <div>
                <ol>
                    {fingerprints.map(({id}) => {
                        return (
                            <li key={id}>
                                Fingerprint ID: <strong>{id}</strong>
                                <button onClick={() => this.removeFingerprint(id)}>Remove</button>
                            </li>
                        );
                    })}
                </ol>

                <button onClick={this.addFingerprint}>Add fingerprint</button>
            </div>
        );
    }
}

UserFingerprints.propTypes = {
    userId: PropTypes.number.isRequired,
    fingerprints: PropTypes.array.isRequired,

    add: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
};

export default UserFingerprints;
