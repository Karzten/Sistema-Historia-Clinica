function VerifyUser(){
    var username = $("#username").val();
    var password = $("#password").val();

    if(username.length==0 || password.length==0){
        return Swal.fire("Mensaje de advertencia", "Llene los campos vacíos", "warning");
    }

    $.ajax({
        url: '../controller/user/verify_user.php',
        type: 'POST',
        data:{
            username: username,
            password: password
        }
    }).done(function(resp){
        if(resp==0){
            Swal.fire("Mensaje de error", 'Usuario y/o contraseña incorrecta', "error");
        }else{
            Swal.fire("Mensaje de confirmación", 'Bienvenido al sistema', "success");
        }
    })
}