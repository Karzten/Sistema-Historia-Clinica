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
           {"defaultContent":"<button style='font-size:13px;' type='button' class='editar btn btn-primary'><i class='fa fa-edit'></i>"}
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

function filterGlobal() {
    $('#user_table').DataTable().search(
        $('#global_filter').val(),
    ).draw();
}