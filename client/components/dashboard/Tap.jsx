import React, { Component, PropTypes } from 'react';

class Tap extends Component {
    render() {
        const {beerKeg: {volume, volumePoured, beerBrand}} = this.props;
        const volumeLeft = volume - volumePoured;
        const volumePercentage = Number.parseInt(volumeLeft / 1000);

        return (
            <div className="beer-tap">
                <div className="beer-tap-pic">{volumePercentage} L</div>
                <div className="beer-tap-name">{beerBrand.name}</div>
            </div>
        );
    }
}

Tap.propTypes = {
    beerKeg: PropTypes.shape({
        volume: PropTypes.number.isRequired,
        volumePoured: PropTypes.number.isRequired,
        beerBrand: PropTypes.shape({
            name: PropTypes.string.isRequired
        })
    })
};

export default Tap;
