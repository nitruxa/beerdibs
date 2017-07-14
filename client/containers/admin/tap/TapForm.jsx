import {connect} from 'react-redux';

import * as uiActions from '../../../actions/ui';
import {
    TAP_SAVED,
    TAP_CREATED,
    saveTap
} from '../../../actions/tap';

import {getBeerKegs} from '../../../actions/beerKeg';

import TapForm from '../../../components/tap/TapForm';

const mapStateToProps = ({uiReducer, tapReducer, beerKegReducer}, {params}) => {
    const tapId = Number.parseInt(params.id);
    const tap = tapReducer.taps.find(t => t.id === tapId) || {};

    return Object.assign({
        ui: uiReducer,
        stateName: 'tap',
        rootUrl: '/beer-taps',
        uiActions: {
            created: TAP_CREATED,
            saved: TAP_SAVED
        },
        beerKegs: beerKegReducer.beerKegs
    }, tap);
};

const TapFormContainer = connect(
    mapStateToProps,
    Object.assign({
        save: saveTap,
        getBeerKegs
    }, uiActions)
)(TapForm);

export default TapFormContainer;
