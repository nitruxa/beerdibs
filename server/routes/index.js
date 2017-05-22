import {Router} from 'express';
import admin from './admin';
import user from './user';
import beerTaps from './beerTaps';
import beerKegs from './beerKegs';
import beerBrands from './beerBrands';

import arduino from './arduino';

const router = new Router();

router.use('/admin', admin);
router.use('/tv', (req, res) => {
    res.status(200).render('tv');
});

router.use('/tap-display', (req, res) => {
    res.status(200).render('tapDisplay');
});

router.use('/api', [
    user,
    router.use('/beer', [beerTaps, beerKegs, beerBrands])
]);

router.use('/arduino', arduino);

export default router;
