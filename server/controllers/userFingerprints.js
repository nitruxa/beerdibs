import {sqlEach, sqlRun} from '../helpers/sql';

export const getNextFingerprintId = function (app) {
    let previousId = 0;

    const GET_FINGERPRINT_USER_SQL = `SELECT * FROM userFingerprints`;

    return sqlEach(app.locals.db, GET_FINGERPRINT_USER_SQL).then(fingerprints => {
        const index = fingerprints.findIndex(({id}) => {
            const lastFingerprint = previousId + 1 !== id;
            previousId = id;
            return lastFingerprint;
        });

        let fingerId;

        if (fingerprints.length === 0) {
            fingerId = 1;
        } else if (index === -1) {
            fingerId = fingerprints[fingerprints.length - 1].id + 1;
        } else {
            fingerId = fingerprints[index - 1].id + 1;
        }

        return fingerId;
    });
};

export const getFingerprint = function (app, payload) {
    const {id, filter} = payload;

    const GET_FINGERPRINT_USER_SQL = `
        SELECT users.*, f.*
        FROM userFingerprints f
        LEFT JOIN users ON users.id = f.userId
    `;

    return sqlEach(app.locals.db, GET_FINGERPRINT_USER_SQL, filter || {'f.id': id, 'users.active': 1});
};

export const updateFingerprintStatus = function (app, payload) {
    const {id, status} = payload;
    const SQL_QUERY = `UPDATE userFingerprints SET status = '${status}' WHERE id = ${id}`;

    return sqlRun(app.locals.db, SQL_QUERY);
};
