import dbWHere from '../helpers/dbWHere';
import {sqlEach} from '../helpers/sql';
import {getUsers} from './user';
import {getBeerKegs} from './beerKegs';

export const getUserStats = (app, payload = {}) => {
    const {db} = app.locals;

    const GET_USER_STATS_SQL = `
        SELECT users.*, SUM(userBeers.volume) as volumeTotal
        FROM userBeers
        LEFT JOIN users ON userBeers.userId = users.id
        LEFT JOIN beerKegs ON userBeers.beerKegId = beerKegs.id
    `;

    return sqlEach(db, GET_USER_STATS_SQL, payload.filter, 'GROUP BY userId ORDER BY volumeTotal DESC');
};

export const getUserActivity = (app, payload = {}) => {
    const {db} = app.locals;

    const GET_USER_STATS_SQL = `
        SELECT * FROM userBeers
        ${dbWHere(payload.filter)}
        ORDER BY date DESC
        ${payload.limit ? 'LIMIT ' + payload.limit : ''}
    `;

    return sqlEach(db, GET_USER_STATS_SQL)
        .then(userBeers => {
            return Promise.all(
                userBeers.map(userBeer => {
                    return getUsers(app, {filter: {
                        'users.id': userBeer.userId
                    }})
                    .then(([user]) => {
                        userBeer.user = user;
                        return userBeer;
                    })
                    .then(() => getBeerKegs(app, {filter: {
                        'beerKegs.id': userBeer.beerKegId
                    }}))
                    .then(beerKegs => {
                        userBeer.beerKed = beerKegs[0];
                        return userBeer;
                    });
                })
            );
        });
};
