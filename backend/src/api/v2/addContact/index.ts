import { Router } from 'express';
import { User } from '../../../models/User';
import { Contact } from '../../../models/Contact'

const app = Router();

app.get('/', (req, res) => {
    res.json({
        message: req.originalUrl
    })
});

app.post('/', async (req, res) => {
    const userInfo = await User.findOne({username: req.body.username})
    if(userInfo == null){
        res.status(406);
        res.json({ title: "user doesn't exist"});
    }
    else{
        console.log(userInfo);
        Contact.create({
            user : userInfo?._id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
        }, (err, data) => {
            if (err) {
                res.status(406);
                res.json({ title: "error creating contact", message: err.message});
            } else {
                res.json({title: "successfully create contact"});
            }
        })
    }
})

export default app;