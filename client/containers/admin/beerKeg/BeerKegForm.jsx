import {connect} from 'react-redux';

import * as uiActions from '../../../actions/ui';
import {
    BEER_KEG_SAVED,
    BEER_KEG_CREATED,
    // BEER_KEG_REMOVED,
    saveBeerKeg,
    restoreBeerKeg,
    removeBeerKeg
} from '../../../actions/beerKeg';

import {getBeerBrands} from '../../../actions/beerBrand';

import BeerKegForm from '../../../components/beerKeg/BeerKegForm';

const mapStateToProps = ({uiReducer, beerKegReducer, beerBrandReducer}, {params}) => {
    const beerKegId = Number.parseInt(params.id);
    const beerKeg = beerKegReducer.beerKegs.find(b => b.id === beerKegId) || {};

    return Object.assign({
        ui: uiReducer,
        stateName: 'beerKeg',
        rootUrl: '/beer-kegs',
        uiActions: {
            created: BEER_KEG_CREATED,
            saved: BEER_KEG_SAVED
        },
        copy: {
            removeButton: 'Remove beer keg',
            removeConfirmHeader: 'Remove beer keg',
            removeConfirmMessage: `Are you sure you want to remove ${beerKeg.beerBrand && beerKeg.beerBrand.name}?`
        },
        beerBrands: beerBrandReducer.beerBrands
    }, beerKeg);
};

const BeerKegFormContainer = connect(
    mapStateToProps,
    Object.assign({
        save: saveBeerKeg,
        remove: removeBeerKeg,
        getBeerBrands,
        restoreBeerKeg
    }, uiActions)
)(BeerKegForm);

export default BeerKegFormContainer;
