const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');
const verifyToken = require('../config/verifyToken');


router.post('/doctors/register', userController.registerDoctor);
router.post('/login', userController.login);
// router.post('/patients/register', passport.authenticate('jwt', {session: false}) , userController.registerPatient);
// router.post('/patients/:id/create_report', passport.authenticate('jwt', {session: false}) , userController.createReport);
router.post('/patients/register', verifyToken , userController.registerPatient);
router.post('/patients/:id/create_report', verifyToken , userController.createReport);
router.get('/patients/:id/all_report', userController.SelectedPatientsAllReports);
router.get('/patients/:status', userController.AllReports);

module.exports = router;




