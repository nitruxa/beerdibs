import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

class BeerBrandsLayout extends Component {

    componentDidMount() {
        this.props.getBeerBrands();
    }

    render() {
        const {beerBrands, headerActions} = this.props;

        return (
            <div className="rowFlex">
                <div className="colLg5 colXs12  section-dark">
                    <div className="header">
                        Beer Brands
                        {headerActions}
                    </div>
                    <div className="content">
                        {beerBrands.map(beerBrand => {
                            return (
                                <div key={beerBrand.id} className="user-wrapper">
                                    <Link to={`/beer-brands/${beerBrand.id}`} className="user-link" title={beerBrand.name}>
                                        <span className="user-image-wrapper">
                                            <img src={`/uploads/beerBrands/${beerBrand.label}.jpg`} style={{width: '100%'}} />
                                        </span>
                                        <span className="user-name">{beerBrand.name}</span>
                                    </Link>
                                </div>
                            );
                        })}
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
    beerBrands: PropTypes.array.isRequired,
    getBeerBrands: PropTypes.func.isRequired
};

BeerBrandsLayout.defaultProps = {};

export default BeerBrandsLayout;
