import { Router } from 'express';

import contacts from './contacts';
import login from './login';
import logout from './logout';
import register from './register';
import homework from './homework';

const app = Router();

app.get('/', (req, res) => {
    res.json({
        message: req.originalUrl
    })
});

app.use('/contacts', contacts);
app.use('/login', login);
app.use('/logout', logout)
app.use('/register', register);
app.use('/homework', homework);

export default app;