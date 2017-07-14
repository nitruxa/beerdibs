import React, { PropTypes } from 'react';
import BeerKegBrand from './BeerKegBrand';
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
                                <BeerKegBrand beerKeg={beerKeg} />
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
