import dbWHere from '../helpers/dbWHere';
import {getBeerKegs} from './beerKegs';

const GET_BEER_TAPS_SQL = `
    SELECT beerTaps.* FROM beerTaps
`;

export const getBeerTaps = function (app, payload = {}) {
    const {db} = app.locals;

    return new Promise((resolve, reject) => {
        const data = [];

        db.serialize(() => {
            db.each(GET_BEER_TAPS_SQL + dbWHere(payload.filter), (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    data.push(row);
                }
            }, () => {
                resolve(data);
            });
        });
    })
    .then(beerTaps => {
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
