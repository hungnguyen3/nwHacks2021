import { Router } from 'express';
import { Homework } from '../../models/Homework'

import { authenticate } from './login';

const app = Router();

app.get('/', (req, res) => {
    res.json({
        message: req.originalUrl
    })
});

app.post('/get', (req, res) => {
    authenticate(req.body.sessionId).then(async (authResult) => {
        if (!authResult.ok) {
            res.status(401);
            res.json({ message: "not authorized" });
        } else {
            const students = await Homework.find({ user: authResult.userId });
            res.json({ students });
        }
    })
})

app.post('/add', (req, res) => {
    authenticate(req.body.sessionId).then(authResult => {
        if (!authResult.ok) {
            res.status(401);
            res.json({ message: "not authorized" });
        } else {
            Homework.create({
                user: authResult.id,
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
                user: authResult.id,
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