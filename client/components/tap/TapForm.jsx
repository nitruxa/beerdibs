import React, {PropTypes} from 'react';

import Form from '../global/Form';
import PreviewImage from '../global/PreviewImage';

class TapForm extends Form {

    componentDidMount() {
        this.props.getBeerKegs();
    }

    getStateProps(props) {
        return {
            ...props,
            beerKeg: this.getBeerKeg(props.beerKegId)
        };
    }

    getBeerKeg(beerKegId) {
        return this.props.beerKegs.find(b => b.id === Number.parseInt(beerKegId)) || {};
    }

    render() {
        const {active = 0, ratio = 1, position = 0, beerKegId, beerKegs: kegs, beerKeg: keg} = this.state.tap;
        const brand = keg.beerBrand;

        console.log('TAP', this.state.tap);

        return (
            <div>
                <div className="header">Edit beer tap</div>
                <form onSubmit={this.onSubmit}>
                    <div className="section">
                        <div className="content">
                            <div className="user-image-profile">
                                <span className="user-image-wrapper">
                                    <PreviewImage image={brand && brand.label} folderPath="/uploads/beerBrands" />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="section">
                        <div className="header">Beer tap details</div>
                        <div className="content">
                            <div className="field-item">
                                <label className="field-item-label">Beer keg:</label>
                                <select className="field-item-input"
                                        name="beerKegId"
                                        value={beerKegId}
                                        onChange={this.onChange}>
                                    {kegs.map(kegOption =>
                                        <option key={kegOption.id} value={kegOption.id}>{`${kegOption.id} - ${kegOption.beerBrand.name}`}</option>
                                    )}
                                </select>
                            </div>

                            <div className="field-item">
                                <label className="field-item-label">Position:</label>
                                <input className="field-item-input"
                                       name="position"
                                       value={position}
                                       onChange={this.onChange}
                                       placeholder="Position" />
                            </div>

                            <div className="field-item">
                                <label className="field-item-label">Ratio:</label>
                                <input className="field-item-input"
                                       name="ratio"
                                       value={ratio}
                                       onChange={this.onChange}
                                       placeholder="Ratio" />
                            </div>

                            <div className="field-item">
                                <label className="field-item-label">Active:</label>
                                <input className="field-item-input"
                                       name="active"
                                       value={active}
                                       onChange={this.onChange}
                                       placeholder="Active" />
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

TapForm.propTypes = {
    stateName: PropTypes.string.isRequired,

    ui: PropTypes.shape({
        action: PropTypes.string.isRequired
    }),

    id: PropTypes.number,
    name: PropTypes.string,
    abv: PropTypes.number,

    save: PropTypes.func.isRequired
};

export default TapForm;
