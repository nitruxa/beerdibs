import React, { Component, PropTypes } from 'react';
import TapTable from './TapTable';

class TapsLayout extends Component {

    componentDidMount() {
        this.props.getTaps();
    }

    render() {
        return (
            <div className="rowFlex">
                <div className="colLg5 colXs12  section-dark">
                    <div className="header">
                        Beer Taps
                    </div>
                    <div className="content">
                        <TapTable taps={this.props.taps} />
                    </div>
                </div>
                <div className="colLg7 colXs12 is-scrollable">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

TapsLayout.propTypes = {
    children: PropTypes.node,
    taps: PropTypes.array,
    getTaps: PropTypes.func.isRequired
};

TapsLayout.defaultProps = {};

export default TapsLayout;
