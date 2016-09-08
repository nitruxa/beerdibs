export const getFingerPrint = function (app, payload) {
    const {id} = payload;
    const {db} = app.locals;

    const GET_FINGERPRINT_USER_SQL = `
        SELECT users.*, f.*
        FROM user_fingerprints f
        LEFT JOIN users ON users.id = f.userId
        WHERE f.id=${id}
    `;

    return new Promise((resolve, reject) => {
        let data = {};

        db.serialize(() => {
            db.each(GET_FINGERPRINT_USER_SQL, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    data = row;
                }
            }, () => {
                resolve(data);
            });
        });
    });
};

export const addFingerprint = function (app, payload) {
    const {db} = app.locals;
    const {userId} = payload;

    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`
                INSERT INTO user_fingerprints (userId)
                VALUES (${userId})
            `, error => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    });
};

export const deleteFingerprint = function (app, payload) {
    const {db} = app.locals;
    const {id} = payload;

    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`
                DELETE FROM user_fingerprints WHERE id=${id}
            `, error => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    });
};
