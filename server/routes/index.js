import express from 'express';
import user from './user';
import beerTaps from './beerTaps';
import beerKegs from './beerKegs';
import beerBrands from './beerBrands';

const router = express.Router(); // eslint-disable-line new-cap

router.use('/api', [
    user,
    router.use('/beer', [beerTaps, beerKegs, beerBrands])
]);

export default router;
