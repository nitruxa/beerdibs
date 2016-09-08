import React, { Component, PropTypes } from 'react';

class UserPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="rowFlex">
                <div className="colLg5 section-dark">
                    <div className="header">On the Tap</div>
                </div>
                <div className="colLg7 section">
                    <div className="header">Activity</div>
                </div>
            </div>
        );
    }
}

UserPage.propTypes = {};

UserPage.defaultProps = {};

export default UserPage;
