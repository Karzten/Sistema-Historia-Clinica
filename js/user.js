function VerifyUser(){
    var username = $("#username").val();
    var password = $("#password").val();

    if(username.length==0 || password.length==0){
        return Swal.fire("Mensaje de advertencia", "Llene los campos vacíos", "warning");
    }

    alert("Hola");
}