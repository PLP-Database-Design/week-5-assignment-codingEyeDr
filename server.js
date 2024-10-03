// importing the neccessary dependencies
const express = require('express')
const mysql = require('mysql2')
const dotenv = require('dotenv')


const app = express()
dotenv.config()

// create a connection object
const db = mysql.createConnection({
   host: process.env.DB_HOST,
   user: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME 
})

// test the connection
db.connect((err) => {
    // connection not successful
    if(err) {
        return console.log("Error connecting to MySQL", err)
    }

    // connection successful
    console.log("MySQL connection successful")
})


// ejs templating configuration
// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');

// app.get('/data', (req,res) => {

//     // Retrieve data from database
//     db.query('SELECT * FROM patients', (err, results) =>{
//         if (err){
//             console.error(err);
//             res.status(500).send('Error retrieving data')
//         }else {
//             // Display the records to the browser
//             res.render('data', {results: results});
//         }
//     });
// });


// get patients
// Question 1
app.get('/get-patients', (req, res) => {
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients"

    db.query(getPatients, (err, results) => {
        // have an error
        if(err) {
            return res.status(500).send("Failed to fetch the patients")
        }

        // get back the data/results
        res.status(200).send(results)
    })
})


// get providers
// Question 2
app.get('/get-providers', (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers";

    db.query(getProviders, (err, results) => {
        // have an error
        if(err) {
            return res.status(500).send("Failed to fetch the providers")
        }

        // get back the data/results
        res.status(200).send(results)
    })
})


// get/filter patients by First Name
// Question 3
app.get('/get-patients-firstname', (req, res) => {
    const getPatientsFirstname = "SELECT first_name FROM patients"

    db.query(getPatientsFirstname, (err, results) => {
        // have an error
        if(err) {
            return res.status(500).send("Failed to fetch the patients first name")
        }

        // get back the data/results
        res.status(200).send(results)
    })
})


// get providers by their specialty
// Question 4
app.get('/get-providers-specialty', (req, res) => {
    const getProvidersSpecialty = "SELECT provider_specialty FROM providers";

    db.query(getProvidersSpecialty, (err, results) => {
        // have an error
        if(err) {
            return res.status(500).send("Failed to fetch the providers")
        }

        // get back the data/results
        res.status(200).send(results)
    })
})





// declare the port and listen to the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})