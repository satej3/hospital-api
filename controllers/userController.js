// const express = require('express');
const doctorModel = require('../models/doctor');
const patientModel = require('../models/patient');
const jwt = require('jsonwebtoken');

module.exports.registerDoctor = async (req, res) => {
    try {
        const doctor = await doctorModel.create(req.body);
        console.log("Registered Doctor = ", doctor);
        res.status(200).json({
            success : true,
            message : 'Doctor Registered Successfully..',
            data : doctor,
        })     
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Internal Server Error..',
            error: error,
        })
    }
}

module.exports.login = async (req, res) => {
    console.log("body we got = ", req.body);
    try {
        const user = await doctorModel.findOne(req.body);
        if(user){
            // const token = jwt.sign(user.id, "secret");
            const token = jwt.sign({ userId: user._id }, "secret", {
                expiresIn: '1h',
                });
            res.status(200).json({
                success : true,
                message : "login successful..",
                token,
            });
        }
        else{
            res.status(404).json({
                success : false,
                message : "credentials did not matched.. Please try again",
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Internal Server Error..',
            error: error,
        })
    }
}

module.exports.registerPatient = async (req, res) => {
    try {
        const patient = await patientModel.create(req.body);
        console.log("Registered Patient = ", patient);
        res.status(200).json({
            success : true,
            message : 'Patient Registered Successfully..',
            data : patient,
        }) 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Internal Server Error..',
            error: error,
        })
    }
}

module.exports.createReport = async (req,res) => {
    try {
        const patient = await patientModel.findById(req.params.id);
        req.body.date = Date.now();
        patient.reports.push(req.body);
        await patient.save();
        res.status(200).json({
            success: true,
            message: 'Report submitted successfully..',
            data : patient,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Internal Server Error..',
            error: error,
        })
    }
}

module.exports.SelectedPatientsAllReports = async (req,res) => {
    try {
        const patient = await patientModel.findById(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Report fetched successfully..',
            data : patient.reports,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Internal Server Error..',
            error: error,
        })
    }
}

module.exports.AllReports = async (req,res) => {
    try {
        const patients = await patientModel.find({
            reports: {$elemMatch : {status : req.params.status}},
        });
        res.status(200).json({
            success: true,
            message: 'All Patients Report fetched successfully whose status = ' + req.params.status,
            data : patients,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Internal Server Error..',
            error: error,
        })
    }
}
