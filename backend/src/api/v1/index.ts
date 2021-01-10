import { Router } from 'express';

import contacts from './contacts';
import login from './login';
import register from './register';

const app = Router();

app.get('/', (req, res) => {
    res.json({
        message: req.originalUrl
    })
});

app.use('/contacts', contacts);
app.use('/login', login);
app.use('/register', register);

export default app;