import express from 'express';
import {getNextFingerprintId, getFingerprint} from '../controllers/userFingerprints';
import sqlRunMiddleware from '../middleware/sqlRun';
import userTokenMiddleware from '../middleware/userToken';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/:userId/fingerprint', (req, res, next) => {
    const {app, params: {userId}} = req;

    getFingerprint(app, {filter: {'users.id': userId, 'users.active': 1}})
        .then(data => res.status(200).json(data))
        .catch(error => next(error));
});

router.get('/fingerprint/:id', (req, res, next) => {
    const {app, params: {id}} = req;

    getFingerprint(app, {id})
        .then(data => res.status(200).json(data[0]))
        .catch(error => next(error));
});

router.post('/fingerprint', userTokenMiddleware(), (req, res, next) => {
    const {app, body: {userId}} = req;

    getNextFingerprintId(app)
        .then(fingerprintId => {
            res.locals.sqlQuery = `
                INSERT INTO userFingerprints (id, userId)
                VALUES (${fingerprintId}, ${userId})
            `;

            app.locals.arduino.sendData({
                event: 'fingerprint',
                data: {
                    scan: true,
                    fingerId: fingerprintId
                }
            });

            next();
        })
        .catch(error => next(error));
}, sqlRunMiddleware, (req, res) => res.status(200).json({id: res.locals.lastInsertId}));

router.delete('/fingerprint/:id', userTokenMiddleware(), (req, res, next) => {
    const {id} = req.params;

    res.locals.sqlQuery = [
        `DELETE FROM userFingerprints WHERE id=${id}`,
        `DELETE FROM sqlite_sequence WHERE name='userFingerprints'`
    ];

    next();
}, sqlRunMiddleware, (req, res) => res.status(200).json({status: 'OK'}));

export default router;
