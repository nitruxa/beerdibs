import dbWHere from './dbWHere';

export const sqlEach = (db, sqlQuery, filter, additionalQuery = '') => {
    return new Promise((resolve, reject) => {
        const data = [];

        db.serialize(() => {
            db.each(sqlQuery + ' ' + dbWHere(filter) + ' ' + additionalQuery, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    data.push(row);
                }
            }, () => {
                resolve(data);
            });
        });
    });
};

export const sqlRun = (db, sqlQuery) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(sqlQuery, error => {
                if (error) {
                    reject(error);
                } else {
                    resolve({status: 'OK'});
                }
            });
        });
    });
};
