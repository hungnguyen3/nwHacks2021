import { Router } from 'express';
import { User } from '../../models/User';
import { Contact } from '../../models/Contact'

const app = Router();

app.get('/', (req, res) => {
    res.json({
        message: req.originalUrl
    })
});

app.post('/get', async (req, res) => {
    const user = await User.findOne({ sessionId: req.body.sessionId });
    if (user != null) {
        const students = await Contact.find({ user: user._id });
        res.json({ students });
    } else {
        res.status(401);
        res.json({ message: "not authorized" });
    }
})

app.post('/add', async (req, res) => {
    const userInfo = await User.findOne({ sessionId: req.body.sessionId})
    if(userInfo == null){
        res.status(406);
        res.json({ title: "user doesn't exist"});
    }
    else{
        console.log(userInfo);
        Contact.create({
            user : userInfo._id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
        }, (err, _data) => {
            if (err) {
                res.status(406);
                res.json({ title: "error creating contact", message: err.message});
            } else {
                res.json({title: "successfully create contact"});
            }
        })
    }
})

app.post('/remove', async (req, res) => {
    Contact.deleteOne({
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
})

export default app;