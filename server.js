const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());

const fs = require('fs');

app.get('/', (req, res) => {
    res.send(`Hello from our GET request!`);
});

//Username
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

app.get ('/ListRes', function (req, res) {
    fs.readFile(__dirname + "/" + "reservation.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));