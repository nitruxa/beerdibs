import dbWHere from '../helpers/dbWHere';

const GET_BEER_BRANDS_SQL = `
    SELECT * FROM beerBrands
`;

export const getBeerBrands = function (app, payload = {}) {
    const {db} = app.locals;

    return new Promise((resolve, reject) => {
        const data = [];

        db.serialize(() => {
            db.each(GET_BEER_BRANDS_SQL + dbWHere(payload.filter), (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    data.push(row);
                }
            }, () => {
                resolve(data);
            });
        });
    });
};
