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

app.use('/', express.static(path.join(__dirname, "../../frontend/build")));

db.once('open', () => {
    app.listen(port, () => console.log(`LISTENING on ${port}`));
})
