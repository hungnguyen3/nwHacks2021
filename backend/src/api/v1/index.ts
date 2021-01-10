import { Router } from 'express';

import contacts from './contacts';
import login from './login';
import logout from './logout';
import register from './register';
import homework from './homework';

const router = Router();

router.get('/', (req, res) => {
    res.json({
        message: req.originalUrl,
    });
});

router.use('/contacts', contacts);
router.use('/login', login);
router.use('/logout', logout);
router.use('/register', register);
router.use('/homework', homework);

export default router;
