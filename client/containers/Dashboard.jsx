import {connect} from 'react-redux';

import Dashboard from '../components/dashboard/Dashboard';
import {getTaps} from '../actions/tap';
import {getActivity} from '../actions/activity';

const mapStateToProps = ({tapReducer, activityReducer}) => {
    return {
        taps: tapReducer.taps,
        activities: activityReducer.activities
    };
};

export default connect(mapStateToProps, {getTaps, getActivity})(Dashboard);
