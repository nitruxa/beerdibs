import {connect} from 'react-redux';

import Dashboard from '../components/dashboard/Dashboard';
import {getTaps} from '../actions/tap';
import {getActivity, getLastMonthStats} from '../actions/activity';

const mapStateToProps = ({tapReducer, activityReducer}) => {
    return {
        taps: tapReducer.taps,
        activities: activityReducer.activities,
        stats: activityReducer.stats
    };
};

export default connect(mapStateToProps, {getTaps, getActivity, getLastMonthStats})(Dashboard);
