import {sqlEach, sqlRun} from '../helpers/sql';

export const getNextFingerprintId = function (app) {
    const GET_FINGERPRINT_USER_SQL = `SELECT * FROM userFingerprints`;

    return sqlEach(app.locals.db, GET_FINGERPRINT_USER_SQL).then(fingerprints => {
        const first = fingerprints[0];
        const last = fingerprints[fingerprints.length - 1];

        let fingerId = 0;

        if (first && last && first.id === last.id) {
            fingerId = first + 1;
        } else if (first && last) {
            for (let i = 1; i <= last.id; i++) {
                const fingerExists = !!fingerprints.find(({id}) => id === i);
                if (!fingerExists) {
                    fingerId = i;
                    break;
                }
            }

            if (!fingerId) {
                fingerId = last.id + 1;
            }
        } else {
            fingerId = 1;
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
