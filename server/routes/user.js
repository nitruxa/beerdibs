import express from 'express';
import userFingerprints from './userFingerprints';
import {getUserStats, getUserActivity} from '../controllers/userStats';
import {getUsers} from '../controllers/user';
import sqlRunMiddleware from '../middleware/sqlRun';


const router = express.Router(); // eslint-disable-line new-cap

router.get('/users', (req, res, next) => {
    getUsers(req.app)
        .then(data => res.status(200).json(data))
        .catch(error => next(error));
});

router.get('/user/stats', (req, res, next) => {
    getUserStats(req.app)
        .then(data => res.status(200).json(data))
        .catch(error => next(error));
});

router.get('/user/activity', (req, res, next) => {
    getUserActivity(req.app, {filter: req.query.filter, limit: req.query.limit})
        .then(data => res.status(200).json(data))
        .catch(error => next(error));
});

router.get('/user/:userId', (req, res, next) => {
    const {userId} = req.params;

    getUsers(req.app, {filter: {'users.id': userId}})
        .then(data => res.status(200).json(data))
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
