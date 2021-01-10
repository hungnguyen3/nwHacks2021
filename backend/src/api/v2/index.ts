import { Router } from 'express';
import addContact from './addContact'
const app = Router();

app.get('/', (req, res) => {
    res.json({
        message: req.originalUrl
    })
});

app.use('/addContact', addContact);

export default app;