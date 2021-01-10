import { Router } from 'express';

import v1 from './v1';
import v2 from './v2';

const app = Router();

app.get('/', (req, res) => {
    res.json({
        message: req.originalUrl
    })
});

app.use('/v1', v1);
app.use('/v2', v2);

export default app;