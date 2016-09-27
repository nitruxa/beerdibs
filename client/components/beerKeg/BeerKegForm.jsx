import React, {PropTypes} from 'react';
import moment from 'moment';

import Form from '../global/Form';
import PreviewImage from '../global/PreviewImage';

class BeerKegForm extends Form {

    constructor(props) {
        super(props);

        this.restoreBeerKeg = this.restoreBeerKeg.bind(this);
    }

    componentDidMount() {
        this.props.getBeerBrands();
    }

    getStateProps(props) {
        const {id, beerBrandId, volume, volumePoured, price, purchaseDate} = props;
        return {
            id,
            beerBrandId,
            beerBrand: this.getBeerBrand(beerBrandId),
            volume: volume && Number.parseFloat(volume),
            volumePoured: volumePoured && Number.parseFloat(volumePoured),
            price: price && Number.parseFloat(price),
            purchaseDate: moment(purchaseDate).format()
        };
    }

    restoreBeerKeg() {
        this.props.restoreBeerKeg(this.props.id);
    }

    getActiveStatusButton() {
        if (this.props.active) {
            return this.getDeleteButton();
        } else if (this.props.id) {
            return (
                <button onClick={this.restoreBeerKeg} className="button--secondary button-small" type="button">
                    Restore beer keg
                </button>
            );
        }
    }

    getBeerBrand(beerBrandId) {
        return this.props.beerBrands.find(b => b.id === Number.parseInt(beerBrandId)) || {};
    }

    getPreviewImage(beerBrandId) {
        if (beerBrandId) {
            return this.getBeerBrand(beerBrandId).label;
        }

        return null;
    }

    render() {
        const {beerBrandId = 0, volume = '', volumePoured = '', price = '', purchaseDate = ''} = this.state.beerKeg;
        const header = name ? name : 'Add beer keg';

        return (
            <div>
                <div className="header">{header}</div>
                <form onSubmit={this.onSubmit}>
                    <div className="section">
                        <div className="content">
                            <div className="user-image-profile">
                                <span className="user-image-wrapper">
                                    <PreviewImage image={this.getPreviewImage(beerBrandId)} folderPath="/uploads/beerBrands" />
                                </span>
                            </div>
                            <div className="actions">
                                {this.getActiveStatusButton()}
                            </div>
                        </div>
                    </div>
                    <div className="section">
                        <div className="header">Beer keg details</div>
                        <div className="content">
                            <div className="field-item">
                                <select className="field-item-intput"
                                    name="beerBrandId"
                                    value={beerBrandId}
                                    onChange={this.onChange}>
                                    {this.props.beerBrands.map(beerBrand => {
                                        return <option key={beerBrand.id} value={beerBrand.id}>{beerBrand.name}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="field-item">
                                <input className="field-item-intput"
                                    name="volume"
                                    value={volume}
                                    onChange={this.onChange}
                                    placeholder="Volume" />
                            </div>

                            <div className="field-item">
                                <input className="field-item-intput"
                                    name="volumePoured"
                                    value={volumePoured}
                                    onChange={this.onChange}
                                    placeholder="Volume poured" />
                            </div>

                            <div className="field-item">
                                <input className="field-item-intput"
                                    name="price"
                                    value={price}
                                    onChange={this.onChange}
                                    placeholder="Price" />
                            </div>

                            <div className="field-item">
                                <input className="field-item-intput"
                                    name="purchaseDate"
                                    value={purchaseDate}
                                    onChange={this.onChange}
                                    placeholder="Purchase date" />
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

BeerKegForm.propTypes = {
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

export default BeerKegForm;
