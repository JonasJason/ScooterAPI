function addUser() {
    var userName = document.getElementById("username").value;

    //var userName = document.getElementById('#username').value;
    console.log(userName);
    let url = "http://127.0.0.1:3000/addUser/" + userName;

    const request = new XMLHttpRequest();

    request.open("POST", url, true);

    request.onload = function () {
        if (request.status == 200) {
            //Clear previous output area
            document.querySelector("#outputArea").innerHTML = "<ul id='log'></ul>";

            //Change output to show that the username was logged
            let newElt = document.createElement('p');

            let textNode = document.createTextNode("Username logged.");

            newElt.appendChild(textNode);

            document.querySelector("#outputArea").appendChild(newElt);


            console.log("username logged");
        }
        else {
            console.log(`Error occured. Status: ${request.status}`);
        }
    };
    request.send();
}