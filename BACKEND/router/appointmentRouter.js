import  express from 'express';
import {isPatientAuthenticated , isAdminAuthenticated} from '../middlewares/auth.js';
import { postAppointment , getAllAppointments , updateAppointmentStatus , deleteAppointment } from '../controller/appointmentController.js';

import getUserAppointments from "../controller/appointmentController.js" 
const router = express.Router();
// Add this new route
router.get("/my-appointments", isPatientAuthenticated, getUserAppointments);



router.post("/post", isPatientAuthenticated, postAppointment);
router.get("/getall", isAdminAuthenticated, getAllAppointments);
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);


export default router;