/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import bcrypt from 'bcryptjs';
import { Router } from 'express';

import { User } from '../../models/User';

const router = Router();

router.post('/', (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12));
    User.create(
        {
            username: req.body.username,
            password: hash,
        },
        (err, data) => {
            if (err) {
                res.status(406);
                res.json({
                    title: 'error creating user',
                    message: err.message,
                });
            } else {
                res.json({ username: data.username });
            }
        }
    );
});

export default router;
