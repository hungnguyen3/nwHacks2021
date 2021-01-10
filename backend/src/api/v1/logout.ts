import { Router } from 'express';

import { User } from '../../models/User';

const app = Router();

app.post('/', async (req, res) => {
    if (!req.body.sessionId) {
        res.status(401);
        res.json({ message: "error" });
    } else {
        const user = await User.findOne({ sessionId: req.body.sessionId });
        if (user != null) {
            User.updateOne({ sessionId: user.sessionId }, { $unset: { sessionId: 1 } }, null, () => {
                res.send({ message: "logged out" });
            })
        }
    }
})

export default app;