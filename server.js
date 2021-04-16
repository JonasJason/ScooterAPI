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
    res.send(`Here's the username: ${userName}`);
    try {
        fs.appendFile("users.json", JSON.stringify(userName), (err) => {
            if (err) throw err;
            console.log('Username logged.');
        });
    }
    catch (err) {
        console.error(err);
    }
});

// const resList = [
//     {
//         name: 'Smith',
//         time: '0900',
//         num: 4
//     },
//     {
//         name: 'Jones',
//         time: '1100',
//         num: 3
//     }
// ];

// fs.writeFile('reslist.json', JSON.stringify(resList), err => {
//     if (err) throw err;
//     console.log('Saved');
// });







app.listen(port, () => console.log(`Listening on port ${port}`));