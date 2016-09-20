import React, {Component, PropTypes} from 'react';

import ConfirmModal from '../global/ConfirmModal';
import IconTrash from 'dibs-vg/dist/react/trash-filled';

class UserFingerprintRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            confirmOpen: false
        };

        this.openConfirm = this.openConfirm.bind(this);
        this.closeConfirm = this.closeConfirm.bind(this);
        this.remove = this.remove.bind(this);
    }

    openConfirm() {
        this.setState({confirmOpen: true});
    }

    closeConfirm() {
        this.setState({confirmOpen: false});
    }

    remove() {
        this.props.remove(this.props.id);
    }

    render() {
        const {id} = this.props;
        return (
            <div className="list-item">
                ID: {id}
                <button className="button--icon" onClick={this.openConfirm}>
                    <IconTrash />
                </button>
                <ConfirmModal copy={{header: 'Remove fingerprint', cancel: 'Cancel', confirm: 'Remove'}}
                    isOpen={this.state.confirmOpen}
                    onCancel={this.closeConfirm}
                    onConfirm={this.remove}>
                    Are you sure you want to remove fingerprint ID {id}?
                </ConfirmModal>
            </div>
        );
    }
}

UserFingerprintRow.propTypes = {
    id: PropTypes.number.isRequired,
    remove: PropTypes.func.isRequired
};

export default UserFingerprintRow;
