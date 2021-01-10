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
    const userInfo = await User.findOne({username: req.body.username})
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
        }, (err, data) => {
            if (err) {
                res.status(406);
                res.json({ title: "error creating new homework", message: err.message});
            } else {
                res.json({title: "successfully create new homework"});
            }
        })
    }
})


export default app;