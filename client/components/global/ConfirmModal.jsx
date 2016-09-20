import React, {Component, PropTypes} from 'react';

class ConfirmModal extends Component {
    render() {
        const {copy, children, isOpen, onCancel, onConfirm} = this.props;

        if (isOpen) {
            return (
                <div className="overlay">
                    <div className="modal">
                        <div className="modal-content">
                            <div className="modal-header">{copy.header}</div>
                            {children}
                        </div>
                        <div className="modal-actions">
                            <button className="button--secondary" type="button" onClick={onCancel}>
                                {copy.cancel}
                            </button>
                            <button className="button--primary" type="button" onClick={onConfirm}>
                                {copy.confirm}
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    }
}

ConfirmModal.propTypes = {
    isOpen: PropTypes.bool,
    copy: PropTypes.shape({
        header: PropTypes.string.isRequired,
        cancel: PropTypes.string.isRequired,
        confirm: PropTypes.string.isRequired
    }),
    children: PropTypes.node.isRequired,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired
};

export default ConfirmModal;
