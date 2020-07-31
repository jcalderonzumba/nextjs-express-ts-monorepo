import { Router } from 'express';
import helloWorldHandler from './helloWordHandler';

const router = Router();

router.get('/v1/hello-word', helloWorldHandler);

export default router;
