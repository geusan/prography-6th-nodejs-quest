import { Router } from 'express';
import TodoRouter from './Todo';

const router = Router();

router.use('/todos', TodoRouter);

export default router;
