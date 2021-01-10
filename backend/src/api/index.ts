import { NextFunction, Request, Response, Router } from 'express';
import cors from 'cors';

import v1 from './v1';

const router = Router();

router.use(cors());

router.get('/', (req, res) => {
    res.json({
        message: req.originalUrl,
    });
});

router.use('/v1', v1);

router.use((req, res, next) => {
    res.status(404);
    next(new Error(`Not found - ${req.originalUrl}`));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    const status = res.statusCode != 200 ? res.statusCode : 500;
    const message = err.message ? err.message : 'Internal Server Error';
    res.status(status).json({
        status,
        message,
    });
});

export default router;
