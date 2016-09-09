import express from 'express';
import {getBeerBrands} from '../controllers/beerBrands';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/brands', (req, res, next) => {
    getBeerBrands(req.app)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => next(error));
});

router.get('/brands/:brandId', (req, res, next) => {
    const {brandId} = req.params;

    getBeerBrands(req.app, {filter: {id: brandId}})
        .then(([beerTap]) => {
            res.status(200).json(beerTap);
        })
        .catch(error => next(error));
});

export default router;
