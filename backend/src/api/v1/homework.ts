import { Router } from 'express';
import { User } from '../../models/User';
import { Homework } from '../../models/Homework'

const app = Router();

app.get('/', (req, res) => {
    res.json({
        message: req.originalUrl
    })
});

app.post('/add', async (req, res) => {
    const userInfo = await User.findOne({sessionId: req.body.sessionId})
    if(userInfo == null){
        res.status(406);
        res.json({ title: "user doesn't exist"});
    }
    else{
        console.log(userInfo);
        Homework.create({
            user : userInfo._id,
            type: req.body.type,
            input: req.body.input,
        }, (err, _data) => {
            if (err) {
                res.status(406);
                res.json({ title: "error creating new homework", message: err.message});
            } else {
                res.json({title: "successfully create new homework"});
            }
        })
    }
})

app.post('/remove', async (req, res) =>{
    const userInfo = await User.findOne({sessionId: req.body.sessionId})
    if(userInfo == null){
        res.status(406);
        res.json({ title: "user doesn't exist"});
    }
    else{
        Homework.deleteOne({
            user: userInfo._id,
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


export default app;