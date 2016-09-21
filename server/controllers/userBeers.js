import moment from 'moment';
import {sqlRun} from '../helpers/sql';

export const addUserBeer = function (app, payload) {
    const {id, beerKegId, volume} = payload;
    const {db} = app.locals;
    const date = moment(new Date()).format();

    const sqlList = [
        `
            INSERT INTO userBeers (userId, beerKegId, volume, date)
            VALUES (${id}, ${beerKegId}, ${volume}, '${date}')
        `,
        `
            UPDATE beerKegs
            SET volumePoured = (SELECT volumePoured FROM beerKegs WHERE id = ${beerKegId}) + ${volume}
            WHERE id = ${beerKegId}
        `
    ];

    return Promise.all(sqlList.map(sql => sqlRun(db, sql)));
};
