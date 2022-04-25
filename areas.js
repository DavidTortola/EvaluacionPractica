document.addEventListener('readystatechange', event => {

    // When HTML/DOM elements are ready:
    if (event.target.readyState === "interactive") {   //does same as:  ..addEventListener("DOMContentLoaded"..
        var user = localStorage.getItem("User");
        if (!user) {
            window.location.replace("index.html");
        }
        GetAreas();
    }

    // When window loaded ( external resources are loaded too- `css`,`src`, etc...) 
    if (event.target.readyState === "complete") {
        var user = localStorage.getItem("User");
        if (!user) {
            window.location.replace("index.html");
        }
        GetAreas()
    }
});


function RegisterArea() {

    var name = $('#txtUser').val();
    var state = $('#txtPassword').val();

    if (!name || !state) {
        alert("Por favor, ingresa tus datos para registrarte.")
        return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ "type": 'RegisterArea', "name": name, "state": state });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch("https://3orsf77q2f.execute-api.us-west-2.amazonaws.com/dev", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(JSON.parse(result).body)
            alert("Área registrada correctamente.")
            GetAreas();
        })
        .catch(error => console.log('error', error));

}


function GetAreas() {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ "type": 'GetAreas' });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch("https://3orsf77q2f.execute-api.us-west-2.amazonaws.com/dev", requestOptions)
        .then(response => response.text())
        .then(result => {
            response = JSON.parse(result).body;
            console.log(response);
            $('tbody').html("");
            for (var i = 0; i < response.Items.length; i++) {
                var area = response.Items[i];
                $('tbody').append("<tr><td>"
                    + (i + 1).toString()
                    + "</td><td>"
                    + area.ID
                    + "</td><td>"
                    + area.state +
                    "</td></tr>");
            }
        })
        .catch(error => console.log('error', error));

}