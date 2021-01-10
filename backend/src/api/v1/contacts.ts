/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Router } from 'express';
import { Contact } from '../../models/Contact';

import { authenticate } from './util';

const app = Router();

app.post('/get', (req, res) => {
    authenticate(req.body.sessionId)
        .then(async authResult => {
            if (!authResult.ok) {
                res.status(401);
                res.json({ message: 'not authorized' });
            } else {
                const students = await Contact.find({
                    user: authResult.userId,
                });
                res.json({ students });
            }
        })
        .catch(err => console.error(err));
});

app.post('/add', (req, res) => {
    authenticate(req.body.sessionId)
        .then(authResult => {
            if (!authResult.ok) {
                res.status(401);
                res.json({ message: 'not authorized' });
            } else {
                Contact.create(
                    {
                        user: authResult.userId,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        phone: req.body.phone,
                    },
                    err => {
                        if (err) {
                            res.status(406);
                            res.json({
                                title: 'error creating contact',
                                message: err.message,
                            });
                        } else {
                            res.json({ title: 'successfully create contact' });
                        }
                    }
                );
            }
        })
        .catch(err => console.error(err));
});

app.delete('/:id', (req, res) => {
    authenticate(req.body.sessionId)
        .then(authResult => {
            if (!authResult.ok) {
                res.status(401);
                res.json({ message: 'not authorized' });
            } else {
                void Contact.deleteOne(
                    {
                        _id: req.params.id,
                    },
                    undefined,
                    err => {
                        if (err) {
                            res.status(500).json({ message: err.message });
                        } else {
                            res.send({ message: `${req.params.id} deleted` });
                        }
                    }
                );
            }
        })
        .catch(err => console.error(err));
});

export default app;
