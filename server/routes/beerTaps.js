import {Router} from 'express';
import {getBeerTaps} from '../controllers/beerTaps';

import sqlRunMiddleware from '../middleware/sqlRun';
import userTokenMiddleware from '../middleware/userToken';

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

router.put('/tap/:id', userTokenMiddleware(), (req, res, next) => {
    const {id} = req.params;
    const {beerKegId, active, position, ratio} = req.body;

    res.locals.sqlQuery = `
        UPDATE beerTaps
        SET
            beerKegId='${beerKegId}',
            active='${active}',
            position='${position}',
            ratio='${ratio}'
        WHERE id=${id}
    `;

    next();
}, sqlRunMiddleware, (req, res) => res.status(200).json({status: 'OK'}));

export default router;
