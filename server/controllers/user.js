import {sqlEach} from '../helpers/sql';

const GET_USERS_SQL = `
    SELECT
        users.*,
        (
            SELECT GROUP_CONCAT(f.id)
            FROM userFingerprints f
            WHERE users.id = f.userId
        ) AS fingerprints
    FROM users
`;

const mapFingerprints = function (row) {
    if (row.fingerprints) {
        row.fingerprints = row.fingerprints.split(',').map(id => Number(id));
    } else {
        row.fingerprints = [];
    }

    return row;
};

export const getUsers = (app, payload = {}) => {
    const {db} = app.locals;

    return sqlEach(db, GET_USERS_SQL, payload.filter || {'users.active': 1})
        .then(users => {
            return users.map(user => {
                return mapFingerprints(user);
            });
        });
};
