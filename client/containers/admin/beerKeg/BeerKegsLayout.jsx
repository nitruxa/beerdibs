import {createElement} from 'react';
import {connect} from 'react-redux';

import BeerKegsLayout from '../../../components/beerKeg/BeerKegsLayout';
import BeerKegsAdminHeaderActions from '../../../components/beerKeg/BeerKegsAdminHeaderActions';
import * as beerKegActions from '../../../actions/beerKeg';

const headerActions = createElement(BeerKegsAdminHeaderActions);

const mapStateToProps = ({beerKegReducer}) => {
    return {
        beerKegs: beerKegReducer.beerKegs,
        headerActions
    };
};

const BeerKegsLayoutContainer = connect(mapStateToProps, beerKegActions)(BeerKegsLayout);

export default BeerKegsLayoutContainer;
