const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());

const fs = require('fs');

app.get('/', (req, res) => {
    res.send(`Hello from our GET request!`);
});

//Find ALL Reservations
app.get('/getReservations', (req, res) => {
    console.log("why does this not show up?????");
        //STEP 1: Read JSON file
        fs.readFile('reservation.json', (err, data) => {
            if (err) throw err;
        
            let resData = JSON.parse(data);
        
            resData.forEach(res => {
                console.log(res);
            });
        
            resData.sort((res1, res2) => {
                if (res1.name < res2.name) {
                    return -1;
                }
                if (res2.name < res1.name) {
                    return 1;
                }
                if (res1.num > res2.num) {
                    return -1;
                }
                if (res2.num > res1.num) {
                    return 1;
                }
                return 0;
            });
        
            resData.forEach(res => {
                console.log(res);
            });
        })
    
        //Return reservations
        res.write(`The reservations are: ${reservations}`);
        console.log("returning reservations");
        res.sendStatus(200);
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



app.listen(port, () => console.log(`Listening on port ${port}`));