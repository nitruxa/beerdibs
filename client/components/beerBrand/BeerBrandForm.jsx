import React, {PropTypes} from 'react';

import Form from '../global/Form';

class BeerBrandForm extends Form {

    getStateProps(props) {
        const {id, name, abv} = props;
        return {id, name, abv: Number.parseFloat(abv)};
    }

    render() {
        const {name = '', abv = ''} = this.state.beerBrand;
        const header = name ? name : 'Add beer brand';

        return (
            <div>
                <div className="header">{header}</div>
                <form onSubmit={this.onSubmit}>
                    <div className="section">
                        <div className="content">
                            <div className="user-image-profile">
                                <span className="user-image-wrapper">
                                    {/*<ProfilePhoto />*/}
                                </span>
                            </div>
                            <div className="actions">
                                {this.getDeleteButton()}
                            </div>
                        </div>
                    </div>
                    <div className="section">
                        <div className="header">Beer brand details</div>
                        <div className="content">
                            <div className="field-item">
                                <input className="field-item-intput"
                                    name="name"
                                    value={name}
                                    onChange={this.onChange}
                                    placeholder="Beer title"
                                    type="text" />
                            </div>

                            <div className="field-item">
                                <input className="field-item-intput"
                                    name="abv"
                                    value={abv}
                                    onChange={this.onChange}
                                    placeholder="Alcohol by volume"
                                    type="text" />
                            </div>

                            {(() => {
                                if (this.isSaved()) {
                                    return (
                                        <div className="form-notify form-notify--success">
                                            SAVED!
                                        </div>
                                    );
                                }
                            })()}
                            <div className="actions">
                                <button className="button--primary" type="submit">Save</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

BeerBrandForm.propTypes = {
    stateName: PropTypes.string.isRequired,

    ui: PropTypes.shape({
        action: PropTypes.string.isRequired
    }),

    id: PropTypes.number,
    name: PropTypes.string,
    abv: PropTypes.number,

    save: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    resetUiAction: PropTypes.func.isRequired
};

export default BeerBrandForm;
