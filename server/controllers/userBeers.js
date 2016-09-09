import moment from 'moment';
import dbWHere from '../helpers/dbWHere';

const GET_USER_BEERS_SQL = `
    SELECT * FROM beers
`;

export const getUserBeers = function (app, payload = {}) {
    const {db} = app.locals;

    return new Promise((resolve, reject) => {
        const data = [];

        db.serialize(() => {
            db.run(GET_USER_BEERS_SQL + dbWHere(payload.filter), (error, row) => {
                if (error) {
                    reject(error);
                } else {
                    data.push(row);
                }
            }, () => {
                resolve(data);
            });
        });
    });
};

export const addUserBeer = function (app, payload) {
    const {id, beerKegId, volume} = payload;
    const {db} = app.locals;
    const date = moment(new Date()).format();

    const ADD_USER_BEER_SQL = `
        INSERT INTO userBeers (userId, beerKegId, volume, date)
        VALUES (${id}, ${beerKegId}, ${volume}, '${date}')
    `;

    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(ADD_USER_BEER_SQL, error => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    });
};
