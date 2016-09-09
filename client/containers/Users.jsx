import React, { Component, PropTypes } from 'react';
import IconUser from 'dibs-vg/dist/react/account-outlined';

class Users extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="rowFlex">
                <div className="colLg5 section-dark">
                    <div className="header">Drunkards</div>
                    <div className="content">
                        <div className="user-wrapper">
                            <a href="/design-firms/2michaels/" className="user-link" title="2Michaels">
                                <span className="user-image-wraper">
                                    <img className="user-image" src="https://a.1stdibscdn.com/trade/TRADE_PROFILE/1468509805_tn1sv/thumb/image.jpg" alt="" />
                                </span>
                                <span className="user-name">Charles Tassin</span>
                            </a>
                        </div>
                        <div className="user-wrapper">
                            <a href="/design-firms/2michaels/" className="user-link" title="2Michaels">
                                <span className="user-image-wraper">
                                    <img className="user-image" src="https://a.1stdibscdn.com/trade/TRADE_PROFILE/1468509805_tn1sv/thumb/image.jpg" alt="" />
                                </span>
                                <span className="user-name">David Collins Studio</span>
                            </a>
                        </div>
                        <div className="user-wrapper">
                            <a href="/design-firms/2michaels/" className="user-link" title="2Michaels">
                                <span className="user-image-wraper">
                                    <IconUser />
                                </span>
                                <span className="user-name">Achille Salvagni Atelier</span>
                            </a>
                        </div>
                        <div className="user-wrapper">
                            <a href="/design-firms/2michaels/" className="user-link" title="2Michaels">
                                <span className="user-image-wraper">
                                    <img className="user-image" src="https://a.1stdibscdn.com/trade/TRADE_PROFILE/1468509805_tn1sv/thumb/image.jpg" alt="" />
                                </span>
                                <span className="user-name">Ben Pentreath</span>
                            </a>
                        </div>
                        <div className="user-wrapper">
                            <a href="/design-firms/2michaels/" className="user-link" title="2Michaels">
                                <span className="user-image-wraper">
                                    <img className="user-image" src="https://a.1stdibscdn.com/trade/TRADE_PROFILE/1468509805_tn1sv/thumb/image.jpg" alt="" />
                                </span>
                                <span className="user-name">2Michaels</span>
                            </a>
                        </div>
                        <div className="user-wrapper">
                            <a href="/design-firms/2michaels/" className="user-link" title="2Michaels">
                                <span className="user-image-wraper">
                                    <img className="user-image" src="https://a.1stdibscdn.com/trade/TRADE_PROFILE/1468509805_tn1sv/thumb/image.jpg" alt="" />
                                </span>
                                <span className="user-name">Ben Pentreath</span>
                            </a>
                        </div>
                        <div className="user-wrapper">
                            <a href="/design-firms/2michaels/" className="user-link" title="2Michaels">
                                <span className="user-image-wraper">
                                    <img className="user-image" src="https://a.1stdibscdn.com/trade/TRADE_PROFILE/1468509805_tn1sv/thumb/image.jpg" alt="" />
                                </span>
                                <span className="user-name">2Michaels</span>
                            </a>
                        </div>
                        <div className="user-wrapper">
                            <a href="/design-firms/2michaels/" className="user-link" title="2Michaels">
                                <span className="user-image-wraper">
                                    <img className="user-image" src="https://a.1stdibscdn.com/trade/TRADE_PROFILE/1468509805_tn1sv/thumb/image.jpg" alt="" />
                                </span>
                                <span className="user-name">Ben Pentreath</span>
                            </a>
                        </div>
                        <div className="user-wrapper">
                            <a href="/design-firms/2michaels/" className="user-link" title="2Michaels">
                                <span className="user-image-wraper">
                                    <img className="user-image" src="https://a.1stdibscdn.com/trade/TRADE_PROFILE/1468509805_tn1sv/thumb/image.jpg" alt="" />
                                </span>
                                <span className="user-name">2Michaels</span>
                            </a>
                        </div>
                        <div className="user-wrapper">
                            <a href="/design-firms/2michaels/" className="user-link" title="2Michaels">
                                <span className="user-image-wraper">
                                    <img className="user-image" src="https://a.1stdibscdn.com/trade/TRADE_PROFILE/1468509805_tn1sv/thumb/image.jpg" alt="" />
                                </span>
                                <span className="user-name">Ben Pentreath</span>
                            </a>
                        </div>
                        <div className="user-wrapper">
                            <a href="/design-firms/2michaels/" className="user-link" title="2Michaels">
                                <span className="user-image-wraper">
                                    <img className="user-image" src="https://a.1stdibscdn.com/trade/TRADE_PROFILE/1468509805_tn1sv/thumb/image.jpg" alt="" />
                                </span>
                                <span className="user-name">2Michaels</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="colLg7 section">
                    <div className="header">Statistics</div>
                    <div className="content">
                        <div className="field-item">
                            <input className="field-item-intput" placeholder="First Name" type="text" />
                        </div>
                        <div className="field-item">
                            <input className="field-item-intput" placeholder="Last Name" type="text" />
                        </div>
                        <div className="actions">
                            <button className="button--secondary">Cancel</button>
                            <button className="button--primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Users.propTypes = {};

Users.defaultProps = {};

export default Users;
