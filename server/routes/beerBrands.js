import express from 'express';
import {getBeerBrands} from '../controllers/beerBrands';

import sqlRunMiddleware from '../middleware/sqlRun';
import userTokenMiddleware from '../middleware/userToken';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/brands', (req, res, next) => {
    getBeerBrands(req.app, {filter: {active: 1}})
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => next(error));
});

router.get('/brands/:id', (req, res, next) => {
    const {id} = req.params;

    getBeerBrands(req.app, {filter: {id}})
        .then(([beerTap]) => {
            res.status(200).json(beerTap);
        })
        .catch(error => next(error));
});

router.post('/brand', userTokenMiddleware(), (req, res, next) => {
    const {name, abv} = req.body;

    res.locals.sqlQuery = `
        INSERT INTO beerBrands (name, abv)
        VALUES ('${name}', '${abv}')
    `;

    next();
}, sqlRunMiddleware);

router.put('/brand/:id', userTokenMiddleware(), (req, res, next) => {
    const {id} = req.params;
    const {name, abv} = req.body;

    res.locals.sqlQuery = `
        UPDATE beerBrands
        SET
            name='${name}',
            abv='${abv}'
        WHERE id=${id}
    `;

    next();
}, sqlRunMiddleware);

router.delete('/brand/:id', userTokenMiddleware(), (req, res, next) => {
    const {id} = req.params;

    res.locals.sqlQuery = `UPDATE beerBrands SET active = 0 WHERE id = ${id};`;

    next();
}, sqlRunMiddleware);

export default router;
