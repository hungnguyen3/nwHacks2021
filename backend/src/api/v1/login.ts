/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import bcrypt from 'bcryptjs';
import { Router } from 'express';
import { v4 as uuid } from 'uuid';

import { User } from '../../models/User';

const router = Router();

const generateUniqueId = async (): Promise<string> => {
    const sessionId = uuid();
    const user = await User.findOne({ sessionId });
    return user != null ? generateUniqueId() : sessionId;
};

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', (req, res) => {
    User.findOne({ username: req.body.username })
        .then(async user => {
            if (
                !user ||
                !bcrypt.compareSync(req.body.password, user.password)
            ) {
                res.status(401);
                res.json({ message: 'invalid credentials' });
            } else {
                user.sessionId = await generateUniqueId();
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                user.save(err => {
                    if (err) {
                        res.json({ message: 'unknown error' });
                        console.error(err);
                    } else {
                        res.json({ sessionId: user.sessionId });
                    }
                });
            }
        })
        .catch(err => console.error(err));
});

export default router;
