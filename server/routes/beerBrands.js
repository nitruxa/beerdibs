import {Router} from 'express';
import {getBeerBrands} from '../controllers/beerBrands';
import renameUploadedImages from '../helpers/renameUploadedImages';

import sqlRunMiddleware from '../middleware/sqlRun';
import userTokenMiddleware from '../middleware/userToken';

const router = new Router();

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
}, sqlRunMiddleware, (req, res, next) => {
    res.locals.sqlQuery = null;

    if (Object.keys(req.files).length) {
        const sqlQuery = renameUploadedImages(res.locals.lastInsertId, req.files, 'beerBrands');
        res.locals.sqlQuery = sqlQuery;
    }

    next();
}, sqlRunMiddleware, (req, res) => res.status(200).json({status: 'OK'}));

router.put('/brand/:id', userTokenMiddleware(), (req, res, next) => {
    const {id} = req.params;
    const {name, abv} = req.body;

    res.locals.sqlQuery = [`
        UPDATE beerBrands
        SET
            name='${name}',
            abv='${abv}'
        WHERE id=${id}
    `];

    if (Object.keys(req.files).length) {
        const sqlQuery = renameUploadedImages(id, req.files, 'beerBrands');
        res.locals.sqlQuery.push(sqlQuery);
    }

    next();
}, sqlRunMiddleware, (req, res) => res.status(200).json({status: 'OK'}));

router.delete('/brand/:id', userTokenMiddleware(), (req, res, next) => {
    const {id} = req.params;

    res.locals.sqlQuery = `UPDATE beerBrands SET active = 0 WHERE id = ${id};`;

    next();
}, sqlRunMiddleware, (req, res) => res.status(200).json({status: 'OK'}));

export default router;
