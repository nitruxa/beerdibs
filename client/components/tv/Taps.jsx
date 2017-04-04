import React, { PropTypes } from 'react';

import style from './Taps.css';

export default function Taps({taps}) {
    return (
        <div className={style.list}>
            {taps.map(tap => {
                const {volume, volumePoured, beerBrand} = tap.beerKeg;
                const volumeLeft = volume - volumePoured;
                const percentageLeft = volumeLeft * 100 / volume;
                return (
                    <div key={tap.id} className={style.tap}>
                        <div className={style.tapContent}>
                            <img className={style.label} src={`/uploads/beerBrands/${beerBrand.label}`} />
                        </div>
                        <div className={style.tapContent}>
                            <div className={style.volumeMeter}>
                                <div className={style.volumeLeft} style={{height: `${percentageLeft}%`}} />
                            </div>
                            <div className={style.volume}>{Math.round(volumeLeft / 1000)}l</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

Taps.propTypes = {
    taps: PropTypes.array
};
