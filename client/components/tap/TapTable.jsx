import React, { PropTypes } from 'react';
import BeerKegBrand from '../BeerKeg/BeerKegBrand';
import {Link} from 'react-router';

function TapTable(props) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Beer Keg</th>
                    <th>Position</th>
                    <th>Ratio</th>
                    <th>Active</th>
                </tr>
            </thead>
            <tbody>
                {props.taps && props.taps.map(tap => {
                    return (
                        <tr key={tap.id}>
                            <td>
                                <Link to={`/beer-taps/${tap.id}`} className="user-link" title={tap.id}>
                                    {tap.id}
                                </Link>
                            </td>
                            <td>
                                <BeerKegBrand beerKeg={tap.beerKeg} />
                            </td>
                            <td>{tap.position}</td>
                            <td>{tap.ratio}</td>
                            <td>{tap.active}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

TapTable.propTypes = {
    taps: PropTypes.array
};

export default TapTable;
