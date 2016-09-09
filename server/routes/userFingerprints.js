import express from 'express';
import {getFingerPrint, addFingerprint, deleteFingerprint} from '../controllers/userFingerprints';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/fingerprint/:id', (req, res, next) => {
    const {app, params: {id}} = req;

    getFingerPrint(app, {id})
        .then(data => res.status(200).json(data))
        .catch(error => next(error));
});

router.post('/fingerprint', (req, res, next) => {
    const {app, body} = req;

    addFingerprint(app, body)
        .then(() => res.status(200).json({status: 'OK'}))
        .catch(error => next(error));
});

router.delete('/fingerprint/:id', (req, res, next) => {
    const {app, params: {id}} = req;

    deleteFingerprint(app, {id})
        .then(() => res.status(200).json({status: 'OK'}))
        .catch(error => next(error));
});

export default router;
