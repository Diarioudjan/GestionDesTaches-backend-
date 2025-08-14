import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createMemberSchema, updateMemberSchema } from '../validators/member.js';
import { createMember, listMembers, getMember, updateMember, deleteMember } from '../controllers/memberController.js';

const router = Router();
router.use(auth);

router.get('/', listMembers);
router.post('/', validate(createMemberSchema), createMember);
router.get('/:id', getMember);
router.put('/:id', validate(updateMemberSchema), updateMember);
router.delete('/:id', deleteMember);

export default router;
