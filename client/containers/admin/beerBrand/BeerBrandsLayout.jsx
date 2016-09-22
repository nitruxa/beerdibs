import {createElement} from 'react';
import {connect} from 'react-redux';

import BeerBrandsLayout from '../../../components/beerBrand/BeerBrandsLayout';
import BeerBrandsAdminHeaderActions from '../../../components/beerBrand/BeerBrandsAdminHeaderActions';
import * as beerBrandActions from '../../../actions/beerBrand';

const headerActions = createElement(BeerBrandsAdminHeaderActions);

const mapStateToProps = ({beerBrandReducer}) => {
    return {
        beerBrands: beerBrandReducer.beerBrands,
        headerActions
    };
};

const BeerBrandsLayoutContainer = connect(mapStateToProps, beerBrandActions)(BeerBrandsLayout);

export default BeerBrandsLayoutContainer;
