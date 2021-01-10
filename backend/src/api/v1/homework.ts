import { Router } from 'express';
import { Homework } from '../../models/Homework'

import { authenticate } from './login';

const app = Router();

app.get('/', (req, res) => {
    res.json({
        message: req.originalUrl
    })
});

app.post('/add', (req, res) => {
    authenticate(req.body.sessionId).then(authResult => {
        if (!authResult.ok) {
            res.status(401);
            res.json({ message: "not authorized" });
        } else {
            Homework.create({
                user: authResult.userId,
                type: req.body.type,
                input: req.body.input,
            }, (err, _data) => {
                if (err) {
                    res.status(406);
                    res.json({ title: "error creating new homework", message: err.message });
                } else {
                    res.json({ title: "successfully create new homework" });
                }
            })
        }
    })
})

app.post('/remove', (req, res) => {
    authenticate(req.body.sessionId).then(authResult => {
        if (!authResult.ok) {
            res.status(401);
            res.json({ message: "not authorized" });
        } else {
            Homework.deleteOne({
                user: authResult.userId,
                type: req.body.type,
                input: req.body.input,
            }, undefined, (err: any) => {
                if (err) {
                    res.send({ title: "error removing homework", message: err.message });
                } else {
                    res.send({ message: "homework deleted" });
                }
            });
        }
    })
})


export default app;