import express from 'express';
import {getBeerKegs} from '../controllers/beerKegs';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/kegs', (req, res) => {
    getBeerKegs(req.app).then(response => {
        res.status(200).json(response);
    });
});

router.get('/kegs/:kegId', (req, res) => {
    const {kegId} = req.params;

    getBeerKegs(req.app, {filter: {id: kegId}}).then(([beerKeg]) => {
        res.status(200).json(beerKeg);
    });
});

export default router;
