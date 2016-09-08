import express from 'express';
import {getBeerTaps} from '../controllers/beerTaps';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/taps', (req, res) => {
    getBeerTaps(req.app).then(response => {
        res.status(200).json(response);
    });
});

router.get('/taps/:tapId', (req, res) => {
    const {tapId} = req.params;

    getBeerTaps(req.app, {filter: {id: tapId}}).then(([beerTap]) => {
        res.status(200).json(beerTap);
    });
});

export default router;
