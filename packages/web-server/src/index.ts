import { logger } from '@jcalderonzumba/web-server-logger';
import express from 'express';
import cookiesMiddleware from 'universal-cookie-express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import * as routes from './routes';
import nextapp from '@jcalderonzumba/web-client';

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const app = express();
app.set('x-powered-by', false);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cookiesMiddleware());
app.use('/api', routes.serverAPIRouter);
app.use('/', routes.nextJSRouter);

(async (): Promise<void> => {
  try {
    await nextapp.prepare();
    app.listen(port, listenPortError => {
      if (listenPortError) {
        logger.error(
          { err: listenPortError },
          `[ExpressServer] Error starting server ${listenPortError}`
        );
        throw listenPortError;
      }
      logger.info(`[ExpressServer] Server ready, listening on port ${port}`);
    });
  } catch (err) {
    logger.error(
      { err },
      '[ExpressServer] Unexpected error while starting server'
    );
  }
})();
