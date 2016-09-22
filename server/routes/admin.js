import express from 'express';
import passwordHash from 'password-hash';

import userTokenMiddleware from '../middleware/userToken';
import {getUsers, updateUserToken} from '../controllers/user';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/login', userTokenMiddleware(false), (req, res) => {
    if (res.locals.user) {
        res.redirect('/admin');
    } else {
        res.status(200).render('login', {redirect: req.query.redirect});
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('__userToken');
    res.redirect('/');
});

router.post('/login', (req, res, next) => {
    const {email, password, redirect} = req.body;

    const filter = {
        email,
        role: 'admin',
        active: 1
    };

    getUsers(req.app, {filter}, true)
        .then(([user]) => {
            if (user && passwordHash.verify(password, user.password)) {
                const userToken = passwordHash.generate(user.email);

                updateUserToken(req.app, {user, userToken})
                    .then(() => {
                        res.cookie('__userToken', userToken);
                        res.redirect('/admin' + redirect);
                    })
                    .catch(error => next(error));
            } else {
                res.status(200).render('login', {
                    loginFailed: true,
                    redirect: req.body.redirect
                });
            }
        });
});

router.use(userTokenMiddleware(), (req, res) => {
    res.status(200).render('admin');
});

export default router;
