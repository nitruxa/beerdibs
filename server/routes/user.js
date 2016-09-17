import express from 'express';
import userFingerprints from './userFingerprints';
import {getUserStats} from '../controllers/userStats';
import {sqlEach} from '../helpers/sql';
import sqlRunMiddleware from '../middleware/sqlRun';

const router = express.Router(); // eslint-disable-line new-cap

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

router.get('/users', (req, res, next) => {
    const {db} = req.app.locals;

    sqlEach(db, GET_USERS_SQL)
        .then(users => {
            users = users.map(user => {
                return mapFingerprints(user);
            });

            res.status(200).json(users);
        })
        .catch(error => next(error));
});

router.get('/user/stats', (req, res, next) => {
    getUserStats(req.app)
        .then(data => res.status(200).json(data))
        .catch(error => next(error));
});

router.get('/user/:userId', (req, res, next) => {
    const {userId} = req.params;
    const db = req.app.locals.db;

    sqlEach(db, GET_USERS_SQL, {'users.id': userId})
        .then(users => {
            users = users.map(user => {
                return mapFingerprints(user);
            });

            res.status(200).json(users[0]);
        })
        .catch(error => next(error));
});

router.post('/user', (req, res, next) => {
    const {email, displayName, slackName} = req.body;

    res.locals.sqlQuery = `
        INSERT INTO users (email, displayName, slackName)
        VALUES ('${email}', '${displayName}', '${slackName}')
    `;

    next();
}, sqlRunMiddleware);

router.put('/user/:userId', (req, res, next) => {
    const {userId} = req.params;
    const {email, displayName, slackName} = req.body;

    res.locals.sqlQuery = `
        UPDATE users
        SET email='${email}', displayName='${displayName}', slackName='${slackName}'
        WHERE id=${userId}
    `;

    next();
}, sqlRunMiddleware);

router.delete('/user/:userId', (req, res, next) => {
    const {userId} = req.params;

    res.locals.sqlQuery = [
        `DELETE FROM users WHERE id=${userId};`,
        `DELETE FROM userFingerprints WHERE userId=${userId};`
    ];

    next();
}, sqlRunMiddleware);

router.use('/user', userFingerprints);

export default router;
