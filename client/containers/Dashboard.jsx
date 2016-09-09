import React, { Component, PropTypes } from 'react';
import IconUser from 'dibs-vg/dist/react/account-outlined';

class UserPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="rowFlex">
                <div className="colLg5 section-dark">
                    <div className="header">On the Tap</div>
                    <div>
                        <div className="beer-tap">
                            <div className="beer-tap-pic">55%</div>
                            <div className="beer-tap-name">Kronenbourg Blanc</div>
                        </div>
                        <div className="beer-tap">
                            <div className="beer-tap-pic">82%</div>
                            <div className="beer-tap-name">Ungurio Koja</div>
                        </div>
                    </div>
                </div>
                <div className="colLg7 section">
                    <div className="header">Activity</div>
                    <div className="content">
                        <div className="user-wrapper">
                            <a href="/design-firms/2michaels/" className="user-link" title="2Michaels">
                                <span className="user-image-wraper">
                                    <img className="user-image" src="https://a.1stdibscdn.com/trade/TRADE_PROFILE/1468509805_tn1sv/thumb/image.jpg" alt="" />
                                </span>
                                <span className="user-name">Charles Tassin poured 0.5l of Kronenbourg Blanc</span>
                            </a>
                            <span className="user-time">3:45PM</span>
                        </div>
                        <div className="user-wrapper">
                            <a href="/design-firms/2michaels/" className="user-link" title="2Michaels">
                                <span className="user-image-wraper">
                                    <img className="user-image" src="https://a.1stdibscdn.com/trade/TRADE_PROFILE/1468509805_tn1sv/thumb/image.jpg" alt="" />
                                </span>
                                <span className="user-name">David Collins Studio poured 0.5l of Kronenbourg Blanc</span>
                            </a>
                            <span className="user-time">6:45PM</span>
                        </div>
                        <div className="user-wrapper">
                            <a href="/design-firms/2michaels/" className="user-link" title="2Michaels">
                                <span className="user-image-wraper">
                                    <IconUser />
                                </span>
                                <span className="user-name">Achille Salvagni Atelier poured 0.5l of Kronenbourg Blanc</span>
                            </a>
                            <span className="user-time">3:25PM</span>
                        </div>
                        <div className="user-wrapper">
                            <a href="/design-firms/2michaels/" className="user-link" title="2Michaels">
                                <span className="user-image-wraper">
                                    <img className="user-image" src="https://a.1stdibscdn.com/trade/TRADE_PROFILE/1468509805_tn1sv/thumb/image.jpg" alt="" />
                                </span>
                                <span className="user-name">Ben Pentreath poured 0.5l of Kronenbourg Blanc</span>
                            </a>
                            <span className="user-time">3:45PM</span>
                        </div>
                        <div className="user-wrapper">
                            <a href="/design-firms/2michaels/" className="user-link" title="2Michaels">
                                <span className="user-image-wraper">
                                    <img className="user-image" src="https://a.1stdibscdn.com/trade/TRADE_PROFILE/1468509805_tn1sv/thumb/image.jpg" alt="" />
                                </span>
                                <span className="user-name">2Michaels poured 0.5l of Kronenbourg Blanc</span>
                            </a>
                            <span className="user-time">3:45PM</span>
                        </div>
                        <div className="user-wrapper">
                            <a href="/design-firms/2michaels/" className="user-link" title="2Michaels">
                                <span className="user-image-wraper">
                                    <img className="user-image" src="https://a.1stdibscdn.com/trade/TRADE_PROFILE/1468509805_tn1sv/thumb/image.jpg" alt="" />
                                </span>
                                <span className="user-name">Ben Pentreath poured 0.5l of Kronenbourg Blanc</span>
                            </a>
                            <span className="user-time">3:45PM</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UserPage.propTypes = {};

UserPage.defaultProps = {};

export default UserPage;
