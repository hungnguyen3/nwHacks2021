import { Router } from 'express';
import { Contact } from '../../models/Contact'

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
            const students = await Contact.find({ user: authResult.userId });
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
            Contact.create({
                user: authResult.id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
            }, (err, _data) => {
                if (err) {
                    res.status(406);
                    res.json({ title: "error creating contact", message: err.message });
                } else {
                    res.json({ title: "successfully create contact" });
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
            Contact.deleteOne({
                user: authResult.id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
            }, undefined, (err: any) => {
                if (err) {
                    res.send({ title: "error", message: err.message });
                } else {
                    res.send({ message: "deleted" });
                }
            });
        }
    });
})

export default app;