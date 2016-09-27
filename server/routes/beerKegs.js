import express from 'express';
import {getBeerKegs} from '../controllers/beerKegs';

import sqlRunMiddleware from '../middleware/sqlRun';
import userTokenMiddleware from '../middleware/userToken';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/kegs', (req, res, next) => {
    getBeerKegs(req.app, {filter: req.query.filter})
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => next(error));
});

router.get('/kegs/:kegId', (req, res, next) => {
    const {kegId} = req.params;

    getBeerKegs(req.app, {filter: {id: kegId}})
        .then(([beerKeg]) => {
            res.status(200).json(beerKeg);
        })
        .catch(error => next(error));
});

router.post('/keg', userTokenMiddleware(), (req, res, next) => {
    const {beerBrandId, volume, volumePoured, price, purchaseDate} = req.body;

    res.locals.sqlQuery = `
        INSERT INTO beerKegs (beerBrandId, volume, volumePoured, price, purchaseDate)
        VALUES ('${beerBrandId}', '${volume}', '${volumePoured}', '${price}', '${purchaseDate}')
    `;

    next();
}, sqlRunMiddleware, (req, res) => res.status(200).json({status: 'OK'}));

router.put('/keg/:id', userTokenMiddleware(), (req, res, next) => {
    const {id} = req.params;
    const {beerBrandId, volume, volumePoured, price, purchaseDate} = req.body;

    res.locals.sqlQuery = `
        UPDATE beerKegs
        SET
            beerBrandId='${beerBrandId}',
            volume='${volume}',
            volumePoured='${volumePoured}',
            price='${price}',
            purchaseDate='${purchaseDate}'
        WHERE id=${id}
    `;

    next();
}, sqlRunMiddleware, (req, res) => res.status(200).json({status: 'OK'}));

router.post('/keg/:id/restore', userTokenMiddleware(), (req, res, next) => {
    const {id} = req.params;

    res.locals.sqlQuery = `UPDATE beerKegs SET active = 1 WHERE id=${id}`;

    next();
}, sqlRunMiddleware, (req, res) => res.status(200).json({status: 'OK'}));

router.delete('/keg/:id', userTokenMiddleware(), (req, res, next) => {
    const {id} = req.params;

    res.locals.sqlQuery = `UPDATE beerKegs SET active = 0 WHERE id = ${id};`;

    next();
}, sqlRunMiddleware, (req, res) => res.status(200).json({status: 'OK'}));

export default router;
