const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide patients name'],
        unique: true,
    },
    reports: [
        {
            status :{
                type:String,
                required:true,
                enum: ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'],
            },
            date:{
                type:Date,
                required:true,
            }
        }
    ],
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    }
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;