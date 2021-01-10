/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Router } from 'express';
import twilio from 'twilio';

import { authenticate } from './util';

const router = Router();
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

router.post('/send/:phone', (req, res) => {
    authenticate(req.body.sessionId)
        .then(_authInfo => {
            client.messages
                .create({
                    body: req.body.message ? req.body.message : '',
                    from: process.env.TWILIO_NO,
                    to: req.params.phone,
                })
                .then(message => {
                    console.log(
                        `[SMS] ${message.from} -> ${message.to} (${message.body})`
                    );
                    res.json(message);
                })
                .catch(err => {
                    console.error(err);
                    res.json(err);
                });
        })
        .catch(err => console.error(err));
});

export default router;
