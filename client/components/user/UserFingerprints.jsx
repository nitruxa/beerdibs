import React, {Component, PropTypes} from 'react';
import IconTrash from 'dibs-vg/dist/react/trash-filled';

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
            <div className="section">
                <div className="header">Fingerprints</div>
                <div className="list">
                    {fingerprints.map(({id}) => {
                        return (
                            <div className="list-item" key={id}>
                                ID: {id}

                                <button className="button--icon" onClick={() => this.removeFingerprint(id)}>
                                    <IconTrash />
                                </button>
                            </div>
                        );
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
    userId: PropTypes.number.isRequired,
    fingerprints: PropTypes.array.isRequired,

    add: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
};

export default UserFingerprints;
