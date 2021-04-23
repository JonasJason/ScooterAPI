//Adding a new user (check if set method is viable to remove duplicates)
function addUser() {
    var userName = document.getElementById("username").value;

    console.log(userName);
    let url = "http://127.0.0.1:3000/addUser/" + userName;

    const request = new XMLHttpRequest();

    request.open("PUT", url, true);

    request.onload = function () {
        if (request.status == 200) {
            //Clear previous output area
            document.querySelector("outputArea").innerHTML = "<ul id='log'></ul>";

            //Change output to show that the username was logged
            let newElt = document.createElement('p');

            let textNode = document.createTextNode("Username logged.");

            newElt.appendChild(textNode);

            document.querySelector("outputArea").appendChild(newElt);


            console.log("username logged");
        }
        else {
            console.log(`Error occured. Status: ${request.status}`);
        }
    };
    request.send();
}

//Adding a new reservation
function addReservation() {
    var resUsername = document.getElementById("resUsername").value;
    var resStartDate = document.getElementById("resStartDate").value;
    var resStartTime = document.getElementById("resStartTime").value;
    var resHours = document.getElementById("resHours").value;

    let url = "http://127.0.0.1:3000/addreservation/" + resUsername + "/" + resStartDate + "/" + resStartTime + "/" + resHours;

    const request = new XMLHttpRequest();

    request.open("PUT", url, true);

    request.onload = function () {
        if (request.status == 200) {

            let newElt = document.createElement('p');

            newElt.appendChild(textNode);

            console.log("New reservation created");
        }
        else {
            console.log(`Error occured. Status: ${request.status}`);
        }
    };
    request.send();
}

//Finding reservation for desired username
function findReservation() {
    var userName = document.getElementById("findUsername").value;

    console.log(`Finding reservations for: ${userName}`);
    let url = "http://127.0.0.1:3000/findReservation/" + userName;

    const request = new XMLHttpRequest();

    request.open("GET", url, true);

    request.onload = function () {
        if (request.status == 200) {
            //Clear old table
            clearTable();

            //Populate table
            try {
                data = JSON.parse(this.response);

                if (data) {
                    addRow(data.username, data.start_date, data.start_time, data.number_of_hours);
                }
            }
            catch {
                window.alert("No reservation found");
            }
            
        }
        else {
            console.log(`Error occured. Status ${request.status}`);
        }
    }
    request.send();
}

//Update Reservation
function updateReservation() {
    var newUsername = document.getElementById("updateUsername").value;
    var newStartDate = document.getElementById("newStartDate").value;
    var newStartTime = document.getElementById("newStartTime").value;
    var newHours = document.getElementById("newHours").value;

    let url = "http://127.0.0.1:3000/updateReservation/" + newUsername + "/" + newStartDate + "/" + newStartTime + "/" + newHours;

    const request = new XMLHttpRequest();

    request.open("PUT", url, true);

    request.onload = function () {
        if (request.status == 200) {

            let newElt = document.createElement('p');

            newElt.appendChild(textNode);

            console.log("Reservation updated.");
            window.alert("Reservation updated");
        }
        else {
            console.log(`Error occured. Status: ${request.status}`);
        }
    };
    request.send();
}

//Delete Reservation
function deleteReservation() {
    var userName = document.getElementById("deleteUsername").value;

    console.log(`Deleting reservation for: ${userName}`);
    let url = "http://127.0.0.1:3000/deleteReservation/" + userName;

    const request = new XMLHttpRequest();

    request.open("GET", url, true);

    request.onload = function () {
        if (request.status == 200) {
            //Clear old table
            clearTable();

            //Populate table
            try {
                data = JSON.parse(this.response);

                if (data) {
                    addRow(data.username, data.start_date, data.start_time, data.number_of_hours);
                }
            }
            catch {
                window.alert("No reservation found");
            }
            
        }
        else {
            console.log(`Error occured. Status ${request.status}`);
        }
    }
    request.send();
}

//Find ALL reservations
function allReservations() {
    let data;

    let url = "http://127.0.0.1:3000/getReservations";

    const request = new XMLHttpRequest();

    request.open("GET", url, true);

    request.onload = function () {
        if (request.status == 200) {
            //Clear old table
            clearTable();

            //Populate table
            data = JSON.parse(this.response);

            for (var i = 0; i < data.length; i++) {
                addRow(data[i].username, data[i].start_date, data[i].start_time, data[i].number_of_hours);
            }
        }
        else {
            console.log(`Error occured. Status ${request.status}`);
        }
    }
    request.send();
}

//Add table rows
function addRow(username, startDate, startTime, hours) {
    let newElt = document.createElement('tr');

    //Add new cells to table
    var cell1 = newElt.insertCell(0);
    cell1.innerHTML = username;

    var cell2 = newElt.insertCell(1);
    cell2.innerHTML = startDate;

    var cell3 = newElt.insertCell(2);
    cell3.innerHTML = startTime;

    var cell4 = newElt.insertCell(3);
    cell4.innerHTML = hours;

    document.querySelector('#dataTable').appendChild(newElt);
}

//Clear table
function clearTable() {
    var myTable = document.getElementById("dataTable");
    var rowCount = myTable.rows.length;
    for (var x = rowCount - 1; x > 0; x--) {
        myTable.deleteRow(x);
    }
}