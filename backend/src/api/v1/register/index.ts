import bcrypt from 'bcryptjs';
import { Router } from 'express';

import { User } from '../../../models/User';

const app = Router();

app.get('/', (req, res) => {
    res.json({
        message: req.originalUrl
    })
});

app.post('/', (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12));
    User.create({
        username: req.body.username,
        password: hash
    }, (err, data) => {
        if (err) {
            res.status(406);
            res.json({ title: "error creating user", message: err.message});
        } else {
            res.json({ username: data.username });
        }
    })
})

export default app;