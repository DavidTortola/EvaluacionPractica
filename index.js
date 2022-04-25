function Login() {

    var name = $('#txtUser').val();
    var password = $('#txtPassword').val();

    if (!name || !password) {
        alert("Por favor, ingresa tus datos para poder iniciar sesión.")
        return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ "type": 'Login', "name": name, "password": password });
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
            if (response) {
                localStorage.setItem("User", response);
                window.location.replace("areas.html");
            } else {
                alert("Datos de login incorrectos.");
                $('#txtUser').focus();
            }

        })
        .catch(error => console.log('error', error));

}



function Register() {

    var name = $('#txtUser').val();
    var password = $('#txtPassword').val();

    if (!name || !password) {
        alert("Por favor, ingresa tus datos para registrarte.")
        return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ "type": 'RegisterUser', "name": name, "password": password });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch("https://3orsf77q2f.execute-api.us-west-2.amazonaws.com/dev", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(JSON.parse(result).body);
            alert("Registro correcto.")
        })
        .catch(error => console.log('error', error));

}