import express from 'express';
import { patientRegister, login ,addNewAdmin } from '../controller/userController.js';

const router = express.Router();

router.post("/patient/register", patientRegister); // Correct function name
router.post("/login", login);
router.post("/admin/addnew",  addNewAdmin);
export const userRouter = router;