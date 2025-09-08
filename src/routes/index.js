import { Router } from 'express';
import authRoutes from './authRoutes.js';
import memberRoutes from './memberRoutes.js';
import taskRoutes from './taskRoutes.js';
import userRoutes from './userRoutes.js';
import { listAllUsers } from '../controllers/allUsersController.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Recuperer les taches de l\'api ici ' });
});

router.get('/all-users', auth, listAllUsers);

router.use('/auth', authRoutes);
router.use('/members', memberRoutes);
router.use('/tasks', taskRoutes);
router.use('/users', userRoutes);

export default router;
