const express = require('express');
const bodyParser = require('body-parser');
const port = 5001;
const router = require('./routes/router');
const db = require('./config/database');
const doctoModel = require('./models/doctor');
const patientModel = require('./models/patient');
const passport = require('passport');
const passportStrategy = require('./config/passport');


const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use(router);

app.listen(port, (err) => {
    if(err){
        console.log('Server no connected. Error : ', err);
    }else{
        console.log('Server is running on port : ',port);
    }
});


