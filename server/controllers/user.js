import {sqlEach, sqlRun} from '../helpers/sql';

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

export const getUsers = (app, payload = {}, withPassword) => {
    const {db} = app.locals;

    return sqlEach(db, GET_USERS_SQL, payload.filter || {'users.active': 1})
        .then(users => {
            return users.map(user => {
                delete user.userToken;
                if (!withPassword) {
                    delete user.password;
                }

                return mapFingerprints(user);
            });
        });
};

export const updateUserToken = (app, {user, userToken}) => {
    const SQL = `
        UPDATE users
        SET userToken='${userToken}'
        WHERE id=${user.id}
    `;

    return sqlRun(app.locals.db, SQL);
};
