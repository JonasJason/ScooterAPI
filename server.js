const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());

const fs = require('fs');

app.get('/', (req, res) => {
    res.send(`Hello from our GET request!`);
});

//Add Username
app.put('/addUser/:userName', (req, res) => {
    const userName = req.params.userName;

    // STEP 1: Reading JSON file
    const users = require("./users");
   
    // Defining new user
    let user = {
        username: userName
    };
   
    // STEP 2: Adding new data to users object
    users.push(user);
   
    // STEP 3: Writing to a file
    fs.writeFile("users.json", JSON.stringify(users), err => {
     
        // Checking for errors
        if (err) throw err; 
   
        console.log("Done writing"); // Success
    });

});

//Find Reservation for Given Username
app.get('/getReservation/:userName', (req, res) => {
    const userName = req.params.userName;

    //STEP 1: Read JSON file
    const reservations = require("./reservation");

    //match username to reservations
});

//Find ALL Reservations
app.get('/getReservations', (req, res) => {

    //STEP 1: Read JSON file
    const reservations = require("./reservation");

    //Return reservations
    res.write(`The reservations are: ${reservations}`);
    console.log("returning reservations");
});

app.listen(port, () => console.log(`Listening on port ${port}`));