import dbWHere from '../helpers/dbWHere';
import {getBeerBrands} from './beerBrands';

const GET_BEER_KEGS_SQL = `
    SELECT * FROM beerKegs
`;

export const getBeerKegs = function (app, payload = {}) {
    const {db} = app.locals;

    return new Promise((resolve, reject) => {
        const data = [];

        db.serialize(() => {
            db.each(GET_BEER_KEGS_SQL + dbWHere(payload.filter), (err, row) => {
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
    .then(beerKegs => {
        const promises = beerKegs.map(({beerBrandId}) => {

            return getBeerBrands(app, {filter: {id: beerBrandId}})
                .then(([beerBrand]) => {
                    beerKegs = beerKegs.map(keg => {
                        if (keg.beerBrandId === beerBrand.id) {
                            keg.beerBrand = beerBrand;
                        }

                        return keg;
                    });
                });
        });

        return Promise.all(promises).then(() => beerKegs);
    });
};
