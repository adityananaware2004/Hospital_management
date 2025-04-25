import express from 'express';
import { patientRegister, login ,addNewAdmin , getAllDoctors , addNewDoctor, getUserDetails , logoutPatient, logoutAdmin } from '../controller/userController.js';
import {
    isAdminAuthenticated,
    isPatientAuthenticated,
  } from "../middlewares/auth.js";
const router = express.Router();

router.post("/patient/register", patientRegister); // Correct function name
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated,  addNewAdmin);
router.get("/doctors", getAllDoctors);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);



export const userRouter = router;