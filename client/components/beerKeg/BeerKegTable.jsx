import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import moment from 'moment';

function getVolume(volume) {
    return (volume / 1000).toFixed(2);
};

function BeerKegTable(props) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Volume</th>
                    <th>Volume poured</th>
                    <th>Purchase date</th>
                </tr>
            </thead>
            <tbody>
                {props.beerKegs.map(beerKeg => {
                    return (
                        <tr key={beerKeg.id}>
                            <td>
                                <Link to={`/beer-kegs/${beerKeg.id}`} className="user-link" title={beerKeg.beerBrand.name}>
                                    <span className="user-image-wrapper">
                                        <img src={`/uploads/beerBrands/${beerKeg.beerBrand.label}`} style={{width: '100%'}} />
                                    </span>
                                    <span className="user-name">{beerKeg.beerBrand.name}</span>
                                </Link>
                            </td>
                            <td>{getVolume(beerKeg.volume)}l</td>
                            <td>{getVolume(beerKeg.volumePoured)}l</td>
                            <td>{moment(beerKeg.purchaseDate).format('YYYY-MM-DD HH:mm')}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

BeerKegTable.propTypes = {
    beerKegs: PropTypes.array.isRequired
};

export default BeerKegTable;
