import {Router} from 'express';
import {getBeerTaps} from '../controllers/beerTaps';

const router = new Router(); // eslint-disable-line new-cap

router.get('/taps', (req, res, next) => {
    getBeerTaps(req.app)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => next(error));
});

router.get('/taps/:tapId', (req, res, next) => {
    const {tapId} = req.params;

    getBeerTaps(req.app, {filter: {id: tapId}})
        .then(([beerTap]) => {
            res.status(200).json(beerTap);
        })
        .catch(error => next(error));
});

export default router;
