import { Router } from 'express';

import contacts from './contacts';
import homework from './homework';
import login from './login';
import logout from './logout';
import register from './register';
import sms from './sms';

const router = Router();

router.get('/', (req, res) => {
    res.json({
        message: req.originalUrl,
    });
});

router.use('/contacts', contacts);
router.use('/homework', homework);
router.use('/login', login);
router.use('/logout', logout);
router.use('/register', register);
router.use('/sms', sms);

export default router;
