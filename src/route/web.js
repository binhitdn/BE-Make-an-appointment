import express from "express";
import home from "../controllers/home";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import specialityController from "../controllers/specialityController";
import patientController from "../controllers/patientController";
import bookingController from "../controllers/bookingController";
import {verifyToken} from "../middleware/VerifyToken.js";
import handbookController from "../controllers/handbookController";
const router = express.Router();
const fileUploader = require('../config/cloudinary.config');


    router.get("/user", home.getCRUD);
    router.post("/kaka", home.postCRUD);
    router.post('/api/login', userController.handleLogin)
    router.get('/api/get-all-users', userController.handleGetAllUsers)
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/edit-user', userController.handleEditUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)

    router.get('/api/allcode', userController.handleGetAllCode)
    router.get('/api/top-docter-home', doctorController.getTopDocterHome)
    router.put('/api/change-password', userController.changePassword)

    router.post('/api/save-infor-doctors', doctorController.postInfoDoctor)
    // router.put('/api/edit-info-doctor', doctorController.editInfoDoctor)

    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById)
    router.get('/api/get-detail-doctor-by-id-doctor', doctorController.getDetailDoctorByIdDoctor)
    router.get('/api/get-detail-doctor-by-specialty', doctorController.handleGetDoctorBySpecialty)
    router.get('/api/get-all-speciality',specialityController.getAllSpeciality)
    router.get('/api/get-speciality-by-id',specialityController.getSpecialityById)
    router.post('/api/create-new-speciality', specialityController.createNewSpeciality)
    router.put('/api/edit-speciality', specialityController.editSpeciality)
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule)
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleDoctorByDate)
    // router.post('/api/add-info-doctor', doctorController.handleAddInfoDoctor)
    // router.get('/api/get-extra-infor-doctor-by-id', doctorController.handleGetExtraDoctorById)
    // router.post('/api/patient-book-appointment', patientController.handlePatientBookAppointment)
    router.get('/api/get-id-doctor-by-id', doctorController.handleGetIdDoctorById)

    router.post('/api/create-new-reviewer-booking', doctorController.createReviewerSchedule)
    router.put('/api/edit-reviewer-booking', doctorController.editReviewerSchedule)








    router.post('/api/patient-book-appointment', bookingController.handlePatientBookAppointment)
    router.get('/api/get-all-booking', bookingController.handleGetAllBooking)
    router.get('/api/edit-booking-comfirm', bookingController.handleEditBookingComfirm)
    router.get('/api/edit-booking-finished', bookingController.handleEditBookingFinished)


    router.get('/api/get-id-patient-by-id-user', userController.handlegetIdPatientByIdUser)


    router.get('/api/count-user', userController.handleCountUser)
    router.get('/api/count-patient', userController.handleCountPatient)
    router.get('/api/count-doctor', userController.handleCountDoctor)
    router.get('/api/count-admin', userController.handleCountAdmin)

    router.post('/api/add-new-handbook', handbookController.addNewhandbook)
    router.post('/api/edit-handbook', handbookController.editHandbookById)
    
    router.get('/api/get-all-handbook', handbookController.getAllhandbook)
    
    router.get('/api/get-handbook-by-id', handbookController.getHandbookById)
    router.get('/api/update-view', handbookController.handleUpdateView)
    router.get('/api/get-booking-for-patient', bookingController.handleGetAllBookingForPatient)
    router.get('/api/get-booking-for-doctor', bookingController.countBookingByDoctor )

    router.get('/api/edit-status-booking', bookingController.handleChangeStatus)
    router.get('/api/get-booking-today', bookingController.handleGetBookingByDoctorStatusAndDate)

    router.get('/api/get-reviews-booking', doctorController.getAllReviewByDoctorId)
    router.post('/api/view-doctor', doctorController.handleCountViewDoctor)
    router.get('/api/get-caclulate-income-doctor', doctorController.handleGetTotalIncomeByMonth)
    router.get('/api/get-all-income-doctor', doctorController.totalIncomeAllDoctor)
    

    router.post('/api/addcommentinhandbook',handbookController.addCommentInHandbook)
    router.get('/api/get-all-comment-in-handbook', handbookController.getCommentInHandbook)
    router.post('/api/add-reply-comment-in-handbook', handbookController.addReplyCommentInHandbook)
    router.post('/api/create-booking-finished', bookingController.createBookingFinished)
    router.post('/api/create-booking-cancelled', bookingController.createBookingCancelled)
    router.get('/api/get-all-reply-comment-in-handbook-by-id-comment', handbookController.getReplyCommentInHandbookByIdComment)
    router.get('/api/get-all-booking-finished', bookingController.handleGetAllBookingForPatientFinished)
    router.get('/api/get-all-doctor', doctorController.handleGetAllDoctor)
    router.get('/api/get-booking-cancelled', bookingController.getBookingCancelled)
    router.post('/cloudinary-upload', fileUploader.single('file'), (req, res, next) => {
      if (!req.file) {
        next(new Error('No file uploaded!'));
        return;
      }
      
      const newImage  = req.file.path;
      
      res.json({ secure_url: newImage });
    });
    
    
    
    



export default router;