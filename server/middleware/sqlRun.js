import {sqlRun, sqlEach} from '../helpers/sql';

const sqlRunMiddleware = (req, res, next) => {
    const {db} = req.app.locals;
    const {sqlQuery} = res.locals;

    let sqlPromise;

    if (!sqlQuery) {
        next();
    }

    if (Array.isArray(sqlQuery)) {
        sqlPromise = Promise.all(sqlQuery.map(sql => sqlRun(db, sql)));
    } else {
        sqlPromise = sqlRun(db, sqlQuery);
    }

    sqlPromise.then(() => {
        const LAST_ID = `SELECT last_insert_rowid() as id`;
        sqlEach(db, LAST_ID)
            .then(([{id}]) => {
                res.locals.lastInsertId = id;
                next();
            })
            .catch(error => next(error));
    })
    .catch(error => next(error));
};

export default sqlRunMiddleware;
