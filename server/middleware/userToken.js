import {getUsers} from '../controllers/user';

export default function checkUserToken(redirect = '/admin/login') {
    return (req, res, next) => {
        const userToken = req.cookies.__userToken;
        const filter = {userToken, role: 'admin', active: 1};

        getUsers(req.app, {filter})
            .then(([user]) => {
                if (user) {
                    res.locals.user = user;
                    next();
                } else if (req.headers.accept === 'application/json') {
                    res.status(401).json();
                } else if (redirect) {
                    let redirectQuery = '';
                    if (req.url !== '/') {
                        redirectQuery = `?redirect=${req.url}`;
                    }
                    res.redirect(redirect + redirectQuery);
                } else {
                    next();
                }
            })
            .catch(error => next(error));
    };
};
