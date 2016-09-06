import express from 'express';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/fingerprint/:id', (req, res) => {
    const {id} = req.params;
    const db = req.app.locals.db;
    let data = {};

    const GET_FINGERPRINT_USER_SQL = `
        SELECT users.*, f.*
        FROM user_fingerprints f
        LEFT JOIN users ON users.id = f.userId
        WHERE f.id=${id}
    `;

    db.serialize(() => {
        db.each(GET_FINGERPRINT_USER_SQL, (err, row) => {
            data = row;
        }, () => {
            res.status(200).json(data);
        });
    });
});

router.post('/fingerprint', (req, res) => {
    const {db} = req.app.locals;
    const {userId} = req.body;

    db.serialize(() => {
        db.run(`
            INSERT INTO user_fingerprints (userId)
            VALUES (${userId})
        `, error => {
            if (error) {
                res.status(400).json({error});
            } else {
                res.status(200).json({status: 'OK'});
            }
        });
    });
});

router.delete('/fingerprint/:fingerprintId', (req, res) => {
    const {db} = req.app.locals;
    const {fingerprintId} = req.params;

    db.serialize(() => {
        db.run(`
            DELETE FROM user_fingerprints WHERE id=${fingerprintId}
        `, error => {
            if (error) {
                res.status(400).json({error});
            }

            res.status(200).json({status: 'OK'});
        });
    });
});

export default router;
