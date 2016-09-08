import express from 'express';
import {getFingerPrint, addFingerprint, deleteFingerprint} from '../controllers/userFingerprints';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/fingerprint/:id', (req, res) => {
    const {app, params: {id}} = req;

    getFingerPrint(app, {id})
        .then(data => res.status(200).json(data))
        .catch(error => res.status(400).json({error}));
});

router.post('/fingerprint', (req, res) => {
    const {app, body} = req;

    addFingerprint(app, body)
        .then(() => res.status(200).json({status: 'OK'}))
        .catch(error => res.status(400).json({error}));
});

router.delete('/fingerprint/:id', (req, res) => {
    const {app, params: {id}} = req;

    deleteFingerprint(app, {id})
        .then(() => res.status(200).json({status: 'OK'}))
        .catch(error => res.status(400).json({error}));
});

export default router;
