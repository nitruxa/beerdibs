import React, { Component, PropTypes } from 'react';
import BeerKegTable from './BeerKegTable';

class BeerBrandsLayout extends Component {

    componentDidMount() {
        this.props.getBeerKegs();
    }

    render() {
        const {beerKegs, headerActions} = this.props;

        return (
            <div className="rowFlex">
                <div className="colLg5 colXs12  section-dark">
                    <div className="header">
                        Beer Kegs
                        {headerActions}
                    </div>
                    <div className="content">
                        <h2>Active kegs</h2>
                        <BeerKegTable beerKegs={beerKegs.filter(b => b.active)} />

                        <h2>Inactive kegs</h2>
                        <BeerKegTable beerKegs={beerKegs.filter(b => !b.active)} />
                    </div>
                </div>
                <div className="colLg7 colXs12 is-scrollable">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

BeerBrandsLayout.propTypes = {
    children: PropTypes.node,
    headerActions: PropTypes.node,
    beerKegs: PropTypes.array.isRequired,
    getBeerKegs: PropTypes.func.isRequired
};

BeerBrandsLayout.defaultProps = {};

export default BeerBrandsLayout;
