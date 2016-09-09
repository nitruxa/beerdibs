import {sqlRun} from '../helpers/sql';

const sqlRunMiddleware = (req, res, next) => {
    const {db} = req.app;
    const {sqlQuery} = res.locals;

    sqlRun(db, sqlQuery)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => next(error));
};

export default sqlRunMiddleware;
