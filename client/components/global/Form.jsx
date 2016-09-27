import React, {Component, PropTypes} from 'react';
import ConfirmModal from '../global/ConfirmModal';

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            [props.stateName]: this.getStateProps(props),
            removeConfirmIsOpen: false
        };

        this.onChange = this.onChange.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onConfirmRemove = this.onConfirmRemove.bind(this);
        this.openConfirmModal = this.openConfirmModal.bind(this);
        this.closeConfirmModal = this.closeConfirmModal.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {router} = this.context;
        const nextAction = nextProps.ui.action;
        const prevAction = this.props.ui.action;

        const {rootUrl, uiActions} = this.props;

        if (prevAction !== nextAction) {
            switch (nextAction) {
                case uiActions.created:
                case uiActions.removed:
                    router.replace(rootUrl);
                    break;
            }
        }

        this.setState({
            [this.props.stateName]: this.getStateProps(nextProps)
        });
    }

    componentWillUpdate(nextProps) {
        if (this.props.params) {
            const id = nextProps.params.id;
            if (id !== this.props.params.id) {
                this.props.resetUiAction();
            }
        }
    }

    componentWillUnmount() {
        this.props.resetUiAction();
    }

    getStateProps() {
        return {};
    }

    isSaved() {
        return this.props.ui.action === this.props.uiActions.saved;
    }

    onChange(event) {
        const {name, value} = event.target;
        const {stateName} = this.props;
        const newState = this.state[stateName];

        newState[name] = value;
        this.setState({
            [stateName]: newState
        });
    }

    onChangeFile(event) {
        const {stateName} = this.props;
        const {name, files: [file]} = event.target;
        const state = this.state[stateName];

        this.setState({
            [stateName]: Object.assign(state, {
                [name]: file
            })
        });
    }

    onSubmit(event) {
        event.preventDefault();
        const state = this.getStateProps(this.state[this.props.stateName]);
        this.props.save(state);
    }

    onConfirmRemove() {
        this.props.remove(this.props.id);
        this.closeConfirmModal();
    }

    openConfirmModal() {
        this.setState({removeConfirmIsOpen: true});
    }

    closeConfirmModal() {
        this.setState({removeConfirmIsOpen: false});
    }

    getDeleteButton() {
        const {id, copy} = this.props;
        const {removeConfirmIsOpen} = this.state;

        if (id) {
            return (
                <span>
                    <button className="button--secondary button-small"
                        onClick={this.openConfirmModal} type="button">
                        {copy.removeButton}
                    </button>
                    <ConfirmModal isOpen={removeConfirmIsOpen}
                        copy={{header: copy.removeConfirmHeader, cancel: 'Cancel', confirm: 'Remove'}}
                        onCancel={this.closeConfirmModal}
                        onConfirm={this.onConfirmRemove}>
                        {copy.removeConfirmMessage}
                    </ConfirmModal>
                </span>
            );
        }

        return null;
    }

    render() {
        return null;
    }
}

Form.propTypes = {
    stateName: PropTypes.string.isRequired,
    params: PropTypes.shape({
        id: PropTypes.string.isRequired
    }),

    uiActions: PropTypes.shape({
        created: PropTypes.string,
        saved: PropTypes.string,
        removed: PropTypes.string
    }),

    rootUrl: PropTypes.string,

    ui: PropTypes.shape({
        action: PropTypes.string.isRequired
    }),

    copy: PropTypes.shape({
        removeButton: PropTypes.string,
        removeConfirmHeader: PropTypes.string,
        removeConfirmMessage: PropTypes.string
    }),

    id: PropTypes.number,

    save: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    resetUiAction: PropTypes.func.isRequired
};

Form.defaultProps = {
    stateName: 'formState',
    rootUrl: '/',
    uiActions: {
        created: 'form:created',
        saved: 'form:saved',
        removed: 'form:removed'
    }
};

Form.contextTypes = {
    router: PropTypes.object.isRequired
};

export default Form;
