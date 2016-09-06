import express from 'express';

const router = express.Router(); // eslint-disable-line new-cap

const GET_USERS_SQL = `
    SELECT
        users.*,
        (
            SELECT GROUP_CONCAT(f.id)
            FROM user_fingerprints f
            WHERE users.id = f.userId
        ) AS fingerprints
    FROM users
`;

const mapFingerprints = function (row) {
    if (row.fingerprints) {
        row.fingerprints = row.fingerprints.split(',').map(id => Number(id));
    } else {
        row.fingerprints = [];
    }

    return row;
};

router.get('/users', (req, res) => {
    const db = req.app.locals.db;
    const data = [];

    db.serialize(() => {
        db.each(GET_USERS_SQL, (err, row) => {
            data.push(mapFingerprints(row));
        }, () => {
            res.status(200).json(data);
        });
    });
});

router.get('/user/:userId', (req, res) => {
    const {userId} = req.params;
    const db = req.app.locals.db;
    let data = {};

    db.serialize(() => {
        db.each(GET_USERS_SQL + `WHERE users.id=${userId}`, (err, row) => {
            data = mapFingerprints(row);
        }, () => {
            res.status(200).json(data);
        });
    });
});

router.post('/user', (req, res) => {
    const db = req.app.locals.db;
    const {email, displayName} = req.body;

    db.serialize(() => {
        db.run(`
            INSERT INTO users (email, displayName)
            VALUES ('${email}', '${displayName}')
        `, err => {
            if (err) {
                res.status(400).json({'message': err});
            }

            res.status(200).json({status: 'OK'});
        });
    });
});

router.put('/user/:userId', (req, res) => {
    const {userId} = req.params;
    const db = req.app.locals.db;
    const {email, displayName} = req.body;

    db.serialize(() => {
        db.run(`
            UPDATE users
            SET email='${email}', displayName='${displayName}'
            WHERE id=${userId}
        `, error => {
            if (error) {
                res.status(400).json({error});
            }

            res.status(200).json({status: 'OK'});
        });
    });
});

export default router;
