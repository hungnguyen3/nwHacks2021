import bcrypt from 'bcryptjs';
import { Router } from 'express';
import { v4 as uuid } from 'uuid';

import { User } from '../../models/User';

const app = Router();

const generateUniqueId = async(): Promise<string> => {
    const sessionId = uuid();
    const user = await User.findOne({ sessionId })
    return user != null ? generateUniqueId() : sessionId;
}

app.post('/', async (req, res) => { 
    const user = await User.findOne({ username: req.body.username });
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
        res.status(401);
        res.json({ message: "invalid credentials" });
    } else {
        user.sessionId = await generateUniqueId();
        user.save(err => {
            if (err) {
                res.json({ message: "unknown error" });
                console.error(err);
            } else {
                res.json({ sessionId: user.sessionId });
            }
        })    
    }
})

export default app;