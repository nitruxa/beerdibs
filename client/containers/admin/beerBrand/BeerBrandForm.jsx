import {connect} from 'react-redux';

import * as uiActions from '../../../actions/ui';
import {
    BEER_BRAND_SAVED,
    BEER_BRAND_CREATED,
    BEER_BRAND_REMOVED,
    saveBeerBrand,
    removeBeerBrand
} from '../../../actions/beerBrand';

import BeerBrandForm from '../../../components/beerBrand/BeerBrandForm';

const mapStateToProps = ({uiReducer, beerBrandReducer}, {params}) => {
    const beerBrandId = Number.parseInt(params.id);
    const beerBrand = beerBrandReducer.beerBrands.find(b => b.id === beerBrandId) || {};

    return Object.assign({
        ui: uiReducer,
        stateName: 'beerBrand',
        rootUrl: '/beer-brands',
        uiActions: {
            created: BEER_BRAND_CREATED,
            saved: BEER_BRAND_SAVED,
            removed: BEER_BRAND_REMOVED
        },
        copy: {
            removeButton: 'Remove beer brand',
            removeConfirmHeader: 'Remove beer brand',
            removeConfirmMessage: `Are you sure you want to remove ${beerBrand.name}?`
        }
    }, beerBrand);
};

const BeerBrandFormContainer = connect(
    mapStateToProps,
    Object.assign({
        save: saveBeerBrand,
        remove: removeBeerBrand
    }, uiActions)
)(BeerBrandForm);

export default BeerBrandFormContainer;
