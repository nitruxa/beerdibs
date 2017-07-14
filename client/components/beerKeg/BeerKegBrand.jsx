import React, { PropTypes } from 'react';
import {Link} from 'react-router';

function BeerKegBrand({beerKeg}) {
    return (
        <Link to={`/beer-kegs/${beerKeg.id}`} className="user-link" title={beerKeg.beerBrand.name}>
            <span className="user-image-wrapper">
                <img src={`/uploads/beerBrands/${beerKeg.beerBrand.label}`} style={{width: '100%'}}/>
            </span>
            <span className="user-name">{beerKeg.beerBrand.name}</span>
        </Link>
    );
};

BeerKegBrand.propTypes = {
    beerKeg: PropTypes.object.isRequired
};

export default BeerKegBrand;
