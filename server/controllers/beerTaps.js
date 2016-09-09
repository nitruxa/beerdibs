import {sqlEach} from '../helpers/sql';
import {getBeerKegs} from './beerKegs';

const GET_BEER_TAPS_SQL = `
    SELECT * FROM beerTaps
`;
// SELECT BB.*, ':', beerKegs.*, ':', beerBrands.*
// FROM beerTaps as BB
// LEFT JOIN beerKegs ON BB.beerKegId = beerKegs.id
// LEFT JOIN beerBrands ON beerKegs.beerBrandId = beerBrands.id;

export const getBeerTaps = function (app, payload = {}) {
    const {db} = app.locals;

    return sqlEach(db, GET_BEER_TAPS_SQL, payload.filter).then(beerTaps => {
        const promises = beerTaps.map(({beerKegId}) => {

            return getBeerKegs(app, {filter: {id: beerKegId}})
                .then(([beerKeg]) => {
                    beerTaps = beerTaps.map(tap => {
                        if (tap.beerKegId === beerKeg.id) {
                            tap.beerKeg = beerKeg;
                        }

                        return tap;
                    });
                });
        });

        return Promise.all(promises).then(() => beerTaps);
    });
};
