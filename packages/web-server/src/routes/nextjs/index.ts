import { Router, Request, Response } from 'express';
import URL from 'url';
import nextapp from '@jcalderonzumba/web-client';

const router = Router();
const handler = nextapp.getRequestHandler();

// TODO: FIX deprecation warning. (NextJS requires the query string parameter)
router.get('/*', (req: Request, res: Response) => {
  // eslint-disable-next-line
  return handler(req, res, { ...URL.parse(req.url, true) });
});

export default router;
