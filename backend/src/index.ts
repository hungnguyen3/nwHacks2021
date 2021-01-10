import express from 'express';
import morgan from 'morgan';
import path from 'path';

import api from './api';
import db from './db';

const app = express();
const port = 8080;

app.use(morgan('dev'));
app.use(express.json());

app.use('/api', api);

app.use('/', express.static(path.join(__dirname, '../../frontend/build')));

app.get('/*', (_req, res) =>
    res.sendFile(path.join(__dirname, '../../frontend/build/index.html'))
);

db.once('open', () => {
    app.listen(port, () => console.log(`LISTENING on ${port}`));
});
