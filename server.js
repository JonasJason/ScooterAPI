const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());

const fs = require('fs');

//Find ALL Reservations
app.get('/getReservations', (req, res) => {
    //STEP 1: Read JSON file
    fs.readFile('reservation.json', (err, data) => {
        if (err) throw err;

        let resData = JSON.parse(data);

        resData.forEach(res => {
            console.log(res);
        });

        resData.sort((res1, res2) => {
            if (res1.start_date < res2.start_date) {
                return -1;
            }
            if (res2.start_date < res1.start_date) {
                return 1;
            }
            if (res1.start_time > res2.start_time) {
                return -1;
            }
            if (res2.start_time > res1.start_time) {
                return 1;
            }
            return 0;
        });

        res.send(resData);
    })
})

//Add new reservation
app.put('/addReservation/:username/:start_date/:start_time/:number_of_hours', (req, res) => {
    const username = req.params.username;
    const start_date = req.params.start_date;
    const start_time = req.params.start_time;
    const number_of_hours = req.params.number_of_hours;

    const reservations = require("./reservation");

    // Defining new reservation
    let reservation = {
        username: username,
        start_date: start_date,
        start_time: start_time,
        number_of_hours: number_of_hours
    }

    reservations.push(reservation);

    console.log(reservation);

    // STEP 3: Writing to a file
    fs.writeFile("reservation.json", JSON.stringify(reservations), err => {

        // Checking for errors
        if (err) throw err;

        console.log("Done writing"); // Success
    });
});

//Update reservation
app.put('/updateReservation/:username/:start_date/:start_time/:number_of_hours', (req, res) => {
    const username = req.params.username;
    const start_date = req.params.start_date;
    const start_time = req.params.start_time;
    const number_of_hours = req.params.number_of_hours;

    const reservations = require("./reservation");

    // Defining new reservation
    let reservation = {
        username: username,
        start_date: start_date,
        start_time: start_time,
        number_of_hours: number_of_hours
    }

    //FIND RESERVATION THAT MATCHES
    fs.readFile('reservation.json', (err, data) => {
        if (err) throw err;

        let resData = JSON.parse(data);
        let desiredReservation;

        resData.forEach(res => {
            if (res.username === userName) {
                desiredReservation = res;
            }
        });
        //replace it (i think i have to use splice)
        desiredReservation = reservation;
        // desiredReservation.username = username;
        // desiredReservation.start_date = start_date;
        // desiredReservation.start_time = start_time;
        // desiredReservation.number_of_hours = number_of_hours;

        console.log(`Updated reservation: ${desiredReservation}`);
        res.send(desiredReservation);
    });


    //REPLACE IT


    reservations.push(reservation);

    console.log(reservation);

    // STEP 3: Writing to a file
    fs.writeFile("reservation.json", JSON.stringify(reservations), err => {

        // Checking for errors
        if (err) throw err;

        console.log("Done writing"); // Success
    });
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
app.get('/findReservation/:userName', (req, res) => {
    const userName = req.params.userName;

    //STEP 1: Read JSON file
    fs.readFile('reservation.json', (err, data) => {
        if (err) throw err;

        let resData = JSON.parse(data);
        let desiredReservation;

        resData.forEach(res => {
            if (res.username === userName) {
                desiredReservation = res;
            }
        });
        console.log(desiredReservation);
        res.send(desiredReservation);
    });
});



app.listen(port, () => console.log(`Listening on port ${port}`));