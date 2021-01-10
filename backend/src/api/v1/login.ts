import bcrypt from 'bcryptjs';
import { Router } from 'express';

import { User } from '../../models/User';

const app = Router();

app.post('/', async (req, res) => { 
    const user = await User.findOne({ username: req.body.username });
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
        res.status(401);
        res.json({ message: "invalid credentials" });
    } else {
        res.json({ message: "success" });
    }
})

export default app;