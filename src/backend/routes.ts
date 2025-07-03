import express from 'express';
import { UserController } from './controllers/UserController';
import { SupabaseController } from './controllers/SupabaseController';

const router = express.Router();

router.post('/login', new UserController().login);
router.get('/informationByExam/:appointmentId', new SupabaseController().getInformationByExamAndSchedulingQueue);

export default router;