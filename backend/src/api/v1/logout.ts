/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Router } from 'express';

import { User } from '../../models/User';

import { authenticate } from './util';

const router = Router();

router.post('/', (req, res) => {
    authenticate(req.body.sessionId)
        .then(async authResult => {
            if (!authResult.ok) {
                res.status(401);
                res.json({ message: 'not logged in' });
            } else {
                const user = await User.findOne({
                    sessionId: req.body.sessionId,
                });
                if (user != null) {
                    void User.updateOne(
                        { sessionId: user.sessionId },
                        { $unset: { sessionId: 1 } },
                        null,
                        () => {
                            res.send({ message: 'logged out' });
                        }
                    );
                }
            }
        })
        .catch(err => console.error(err));
});

export default router;
