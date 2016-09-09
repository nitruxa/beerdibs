import {sqlEach} from '../helpers/sql';
import {getBeerBrands} from './beerBrands';

const GET_BEER_KEGS_SQL = `
    SELECT * FROM beerKegs
`;

export const getBeerKegs = function (app, payload = {}) {
    const {db} = app.locals;

    return sqlEach(db, GET_BEER_KEGS_SQL, payload.filter).then(beerKegs => {
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
