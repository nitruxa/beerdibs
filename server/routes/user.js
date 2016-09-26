import express from 'express';
import passwordHash from 'password-hash';

import userFingerprints from './userFingerprints';
import {getUserStats, getUserActivity} from '../controllers/userStats';
import {getUsers} from '../controllers/user';
import sqlRunMiddleware from '../middleware/sqlRun';
import userTokenMiddleware from '../middleware/userToken';
import renameUploadedImages from '../helpers/renameUploadedImages';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/users', (req, res, next) => {
    getUsers(req.app)
        .then(data => res.status(200).json(data))
        .catch(error => next(error));
});

router.get('/user/stats', (req, res, next) => {
    getUserStats(req.app, {filter: req.query.filter})
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

const getRolePassword = function ({role, password}) {
    if (role === 'admin' && password) {
        return {
            role,
            password: passwordHash.generate(password)
        };
    }

    return {};
};

router.post('/user', userTokenMiddleware(), (req, res, next) => {
    const {email, displayName, slackName} = req.body;
    const {role, password} = getRolePassword(req.body);

    res.locals.sqlQuery = `
        INSERT INTO users (email, displayName, slackName ${role && password ? `, role, password` : '' })
        VALUES ('${email}', '${displayName}', '${slackName}' ${role && password ? `, '${role}', '${password}'` : '' } )
    `;

    next();
}, sqlRunMiddleware, (req, res, next) => {
    res.locals.sqlQuery = null;

    if (Object.keys(req.files).length) {
        const sqlQuery = renameUploadedImages(res.locals.lastInsertId, req.files, 'users');
        res.locals.sqlQuery = sqlQuery;
    }

    next();
}, sqlRunMiddleware, (req, res) => res.status(200).json({status: 'OK'}));

router.put('/user/:id', userTokenMiddleware(), (req, res, next) => {
    const {id} = req.params;
    const {email, displayName, slackName} = req.body;
    const {role, password} = getRolePassword(req.body);

    let roleAndPassword = '';

    if (role && password) {
        roleAndPassword = `,
            role='${role}',
            password='${password}'
        `;
    }

    res.locals.sqlQuery = [`
        UPDATE users
        SET
            email='${email}',
            displayName='${displayName}',
            slackName='${slackName}'
            ${roleAndPassword}
        WHERE id=${id}
    `];

    if (Object.keys(req.files).length) {
        const sqlQuery = renameUploadedImages(id, req.files, 'users');
        res.locals.sqlQuery.push(sqlQuery);
    }

    next();
}, sqlRunMiddleware, (req, res) => res.status(200).json({status: 'OK'}));

router.delete('/user/:userId', userTokenMiddleware(), (req, res, next) => {
    const {userId} = req.params;

    res.locals.sqlQuery = [
        `UPDATE users SET active=0 WHERE id=${userId};`,
        `DELETE FROM userFingerprints WHERE userId=${userId};`
    ];

    next();
}, sqlRunMiddleware, (req, res) => res.status(200).json({status: 'OK'}));

router.use('/user', userFingerprints);

export default router;
