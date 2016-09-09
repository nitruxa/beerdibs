import {sqlEach} from '../helpers/sql';

export const getUserStats = (app, payload = {}) => {
    const {db} = app.locals;

    const GET_USER_STATS_SQL = `
        SELECT users.*, SUM(userBeers.volume) as volumeTotal
        FROM userBeers
        LEFT JOIN users ON userBeers.userId = users.id
        LEFT JOIN beerKegs ON userBeers.beerKegId = beerKegs.id
        GROUP BY userId
        ORDER BY volumeTotal DESC
    `;

    return sqlEach(db, GET_USER_STATS_SQL, payload.filter);
};
