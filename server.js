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
app.post('/addUser/:userName', (req, res) => {
    const userName = req.params.userName;
    res.send(`Here's the username: ${userName}`);
    try {
        fs.appendFile("users.txt", `${userName}\n`, (err) => {
            if (err) throw err;
            console.log('Username logged.');
        });
    }
    catch (err) {
        console.error(err);
    }
});








app.listen(port, () => console.log(`Listening on port ${port}`));