import {sqlEach} from '../helpers/sql';

export const getFingerPrint = function (app, payload) {
    const {id, filter} = payload;
    const {db} = app.locals;

    const GET_FINGERPRINT_USER_SQL = `
        SELECT users.*, f.*
        FROM userFingerprints f
        LEFT JOIN users ON users.id = f.userId
    `;

    return sqlEach(db, GET_FINGERPRINT_USER_SQL, filter || {'f.id': id});
};
