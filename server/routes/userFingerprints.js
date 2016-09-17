import express from 'express';
import {getFingerPrint} from '../controllers/userFingerprints';
import sqlRunMiddleware from '../middleware/sqlRun';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/:userId/fingerprint', (req, res, next) => {
    const {app, params: {userId}} = req;

    getFingerPrint(app, {filter: {'users.id': userId}})
        .then(data => res.status(200).json(data))
        .catch(error => next(error));
});

router.get('/fingerprint/:id', (req, res, next) => {
    const {app, params: {id}} = req;

    getFingerPrint(app, {id})
        .then(data => res.status(200).json(data[0]))
        .catch(error => next(error));
});

router.post('/fingerprint', (req, res, next) => {
    const {userId} = req.body;

    res.locals.sqlQuery = `
        INSERT INTO userFingerprints (userId)
        VALUES (${userId})
    `;

    next();
}, sqlRunMiddleware);

router.delete('/fingerprint/:id', (req, res, next) => {
    const {id} = req.params;

    res.locals.sqlQuery = `
        DELETE FROM userFingerprints WHERE id=${id}
    `;

    next();
}, sqlRunMiddleware);

export default router;
