import { Router } from 'express';

import v1 from './v1';

const app = Router();

app.get('/', (req, res) => {
    res.json({
        message: req.originalUrl
    })
});

app.use('/v1', v1);

export default app;