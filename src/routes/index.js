import { Router } from 'express';
import authRoutes from './authRoutes.js';
import memberRoutes from './memberRoutes.js';
import taskRoutes from './taskRoutes.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Recuperer les taches de l\'api ici ' });
});

router.use('/auth', authRoutes);
router.use('/members', memberRoutes);
router.use('/tasks', taskRoutes);

export default router;
