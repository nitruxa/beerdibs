import express from 'express';

const router = express.Router(); // eslint-disable-line new-cap

const GET_BEERS_SQL = `
    SELECT * FROM "beers"
`;

router.get('/beers', (req, res) => {
    const db = req.app.locals.db;
    const data = [];

    db.serialize(() => {
        db.each(GET_BEERS_SQL, (err, row) => {
            data.push(row);
        }, () => {
            res.status(200).json(data);
        });
    });
});

export default router;
