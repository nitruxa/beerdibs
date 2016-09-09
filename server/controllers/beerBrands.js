import {sqlEach} from '../helpers/sql';

const GET_BEER_BRANDS_SQL = `
    SELECT * FROM beerBrands
`;

export const getBeerBrands = function (app, payload = {}) {
    const {db} = app.locals;
    return sqlEach(db, GET_BEER_BRANDS_SQL, payload.filter);
};
