import {connect} from 'react-redux';

import TapsLayout from '../../../components/tap/TapsLayout';
import * as tapActions from '../../../actions/tap';

const mapStateToProps = ({tapReducer}) => {
    return {
        taps: tapReducer.taps
    };
};

const TapsLayoutContainer = connect(mapStateToProps, tapActions)(TapsLayout);

export default TapsLayoutContainer;
