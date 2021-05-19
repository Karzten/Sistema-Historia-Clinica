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
            var data = JSON.parse(resp);
            if(data[0][5]=='INACTIVO'){
                return Swal.fire("Mensaje de advertencia", 'Lo sentimos, el usuario '+username+' se encuentra suspendido' , "warning");
            }
            $.ajax({
                url: '../controller/user/create_session.php',
                type: 'POST',
                data:{
                user_id: data[0][0],
                user: data[0][1],
                role: data[0][4],
                }
            }).done(function(resp){
                let timerInterval
                Swal.fire({
                title: 'BIENVENIDO AL SISTEMA',
                html: 'Usted será redireccionado en <b></b> milisegundos.',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(() => {
                    const content = Swal.getContent()
                    if (content) {
                        const b = content.querySelector('b')
                        if (b) {
                        b.textContent = Swal.getTimerLeft()
                        }
                    }
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
                }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    location.reload();
                }
                })
            })
        }
    })
}

var table = "";

function ListUser(){
    table = $("#user_table").DataTable({
       "ordering":false,
       "paging": false,
       "searching": { "regex": true },
       "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
       "pageLength": 10,
       "destroy":true,
       "async": false ,
       "processing": true,
       "ajax":{
           "url":"../controller/user/list_user.php",
           type:'POST'
       },
       "columns":[
           {"data":"numero"},
           {"data":"username"},
           {"data":"name"},
           {"data":"gender"},
           {"data":"status",
           render: function (data, type, row ) {
               if(data=='ACTIVO'){
                   return "<span class='label label-success'>"+data+"</span>";                   
               }else{
                 return "<span class='label label-danger'>"+data+"</span>";                 
               }
             }
           },  
           {"defaultContent":"<button style='font-size:13px;' type='button' class='edit btn btn-primary'><i class='fa fa-edit'></i>&nbsp;<button style='font-size:13px;' type='button' class='desactivate btn btn-danger'><i class='fa fa-trash'></i>&nbsp;<button style='font-size:13px;' type='button' class='activate btn btn-success'><i class='fa fa-check'></i>"}
       ],

       "language":idioma_espanol,
       select: true
   });

   document.getElementById("user_table_filter").style.display="none";

    $('input.global_filter').on( 'keyup click', function () {
        filterGlobal();
    } );

    $('input.column_filter').on( 'keyup click', function () {
        filterColumn( $(this).parents('tr').attr('data-column') );
    });
}

$('#user_table').on('click', '.edit', function(){
    var data = table.row($(this).parents('tr')).data();
    if(table.row(this).child.isShown()){
        var data = table.row(this).data();
    }
    $("#edit_modal").modal({backdrop:'static', keyboard:false});
    $("#edit_modal").modal('show');

    $("#user_id").val(data.user_id);
    $("#txtUsernameEdit").val(data.username);
    $("#cbxGenderEdit").val(data.gender).trigger("change");
    $("#cbxRoleEdit").val(data.role_id).trigger("change");
})

$('#user_table').on('click', '.desactivate', function(){
    var data = table.row($(this).parents('tr')).data();
    if(table.row(this).child.isShown()){
        var data = table.row(this).data();
    }

    Swal.fire({
        title: '¿Está seguro que desea desactivar el usuario?',
        text: "Una vez hecho, el usuario no tendrá acceso al sistema",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, desactivarlo'
    }).then((result) => {
        if (result.value) {
            UpdateStatus(data.user_id, 'INACTIVO');
        }
    })
})

$('#user_table').on('click', '.activate', function(){
    var data = table.row($(this).parents('tr')).data();
    if(table.row(this).child.isShown()){
        var data = table.row(this).data();
    }

    Swal.fire({
        title: '¿Está seguro que desea activar el usuario?',
        text: "Una vez hecho, el usuario tendrá acceso al sistema",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, activarlo'
    }).then((result) => {
        if (result.value) {
            UpdateStatus(data.user_id, 'ACTIVO');
        }
    })
})

function UpdateStatus(user_id, status){
    var message = "";
    if(status=='ACTIVO'){
        message="activó";
    }else{
        message="desactivó"
    }
    $.ajax({
        "url": "../controller/user/update_status.php",
        type: 'POST',
        data:{
            user_id:user_id,
            status:status
        }
    }).done(function(resp){
        if(resp>0){
            Swal.fire("Mensaje de Confirmación", "El usuario se "+message+" con éxito", "success")
            .then((value)=>{
                table.ajax.reload();
            });
        }
    })
}

function filterGlobal() {
    $('#user_table').DataTable().search(
        $('#global_filter').val(),
    ).draw();
}

function OpenRegisterModal(){
    $("#register_modal").modal({backdrop: 'static', keyboard: false});
    $("#register_modal").modal('show');
}

function ListComboRole(){
    $.ajax({
        "url":"../controller/user/list_combo_role.php",
        type:'POST'
    }).done(function(resp){
        var data = JSON.parse(resp);
        var chain = "";
        if(data.length>0){
            for(var i = 0; i < data.length; i++){
                chain+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
            }
            $("#cbxRole").html(chain);
            $("#cbxRoleEdit").html(chain);
        }else{
            chain+="<option value=''>NO SE ENCONTRARON DATOS</option>";
        }
    })
}

function RegisterUser(){
    var username = $("#txtUsername").val();
    var password = $("#txtPassword").val();
    var confirmation = $("#txtConfirmation").val();
    var gender = $("#cbxGender").val();
    var role = $("#cbxRole").val();

    if(username.length==0 || password.length==0 || confirmation.length==0 || gender.length==0 || role.length==0){
        return Swal.fire("Mensaje de Advertencia", "Llene los campos vacíos", "warning");
    }

    if(password != confirmation){
        return Swal.fire("Mensaje de Advertencia", "Las contraseñas no coinciden", "warning");
    }

    $.ajax({
        "url":"../controller/user/register_user.php",
        type: 'POST',
        data:{
            username:username,
            password:password,
            gender: gender,
            role: role
        }
    }).done(function(resp){
        if(resp>0){
            if(resp==1){
                $("#register_modal").modal('hide');
                Swal.fire("Mensaje de Confirmación", "Nuevo usuario registrado", "success")
                .then((value)=>{
                    CleanRegister();
                    table.ajax.reload();
                });
            }else{
                Swal.fire("Mensaje de Advertencia", "Lo sentimos, el nombre de usuario no se encuentra disponible", "warning");
            }
        }else{
            Swal.fire("Mensaje de Error", "Lo sentimos, no se pudo completar el registro", "error");
        }
    })
}

function UpdateUser(){
    var user_id = $("#user_id").val();
    var gender = $("#cbxGenderEdit").val();
    var role = $("#cbxRoleEdit").val();

    if(user_id.length==0 || gender.length==0 || role.length==0){
        return Swal.fire("Mensaje de Advertencia", "Llene los campos vacíos", "warning");
    }
    
    $.ajax({
        "url":"../controller/user/update_user.php",
        type: 'POST',
        data:{
            user_id:user_id,
            gender: gender,
            role: role
        }
    }).done(function(resp){
        if(resp>0){
            $("#edit_modal").modal('hide');
            Swal.fire("Mensaje de Confirmación", "Datos actualizados correctamente", "success")
            .then((value)=>{
                table.ajax.reload();
                DataUser();
            });
        }else{
            Swal.fire("Mensaje de Error", "Lo sentimos, no se pudo editar el usuario", "error");
        }
    })
}

function CleanRegister(){
    $("#txtUsername").val("");
    $("#txtPassword").val("");
    $("#txtConfirmation").val("");
}

function DataUser(){
    var user = $("#main_user").val();
    $.ajax({
        "url":"../controller/user/data_user.php",
        type: 'POST',
        data:{
            user: user
        }
    }).done(function(resp){
        var data = JSON.parse(resp);
        if(data.length>0){
            if(data[0][3]=='MASCULINO'){
                $("#img_nav").attr("src", "../assets/dist/img/avatar5.png");
                $("#img_subnav").attr("src", "../assets/dist/img/avatar5.png");
                $("#img_side").attr("src", "../assets/dist/img/avatar5.png");
            }else{
                $("#img_nav").attr("src", "../assets/dist/img/avatar3.png");
                $("#img_subnav").attr("src", "../assets/dist/img/avatar3.png");
                $("#img_side").attr("src", "../assets/dist/img/avatar3.png");
            }
        }
    })
}