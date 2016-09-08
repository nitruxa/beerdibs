import express from 'express';
import user from './user';
import fingerprint from './fingerprint';
import beer from './beer';

const router = express.Router(); // eslint-disable-line new-cap

router.use('/api', user);
router.use('/api', fingerprint);
router.use('/api', beer);

export default router;
