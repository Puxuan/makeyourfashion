import express from 'express';
import compression from 'compression';
import path from 'path';
import 'isomorphic-fetch';
import cookieParser from 'cookie-parser';
import page from './routes/page';
import api from './routes/api';

// eslint-disable-line import/no-dynamic-require
const port = parseInt(KYT.SERVER_PORT, 10);
const app = express();
app.use(cookieParser());

// Remove annoying Express header addition.
app.disable('x-powered-by');

// Compress (gzip) assets in production.
app.use(compression());

// Setup the public directory so that we can server static assets.
app.use(express.static(path.join(process.cwd(), KYT.PUBLIC_DIR)));

app.use('/api', api);
app.use(page);

app.listen(port, () => {
  console.log(`✅  server started on port: ${port}`); // eslint-disable-line no-console
});
