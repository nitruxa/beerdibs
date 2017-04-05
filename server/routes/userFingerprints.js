import {Router} from 'express';
import {getNextFingerprintId, getFingerprint} from '../controllers/userFingerprints';
import sqlRunMiddleware from '../middleware/sqlRun';
import userTokenMiddleware from '../middleware/userToken';

const router = new Router();

router.get('/:userId/fingerprint', async (req, res) => {
    const {app, params: {userId}} = req;
    const fingerprint = await getFingerprint(app, {filter: {'users.id': userId, 'users.active': 1}});
    res.status(200).json(fingerprint);
});

router.get('/fingerprint/:id', async (req, res) => {
    const {app, params: {id}} = req;

    const fingerprint = await getFingerprint(app, {id});
    res.status(200).json(fingerprint[0]);
});

router.post('/fingerprint', userTokenMiddleware(), async (req, res, next) => {
    const {app, body: {userId}} = req;

    const fingerprintId = await getNextFingerprintId(app);
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
