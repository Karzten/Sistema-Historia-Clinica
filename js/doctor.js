var doctor_table;

function filterGlobal() {
    $('#doctor_table').DataTable().search(
        $('#global_filter').val(),
    ).draw();
}

function ListDoctor(){
    doctor_table = $("#doctor_table").DataTable({
       "ordering":false,
       "paging": false,
       "searching": { "regex": true },
       "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
       "pageLength": 10,
       "destroy":true,
       "async": false ,
       "processing": true,
       "ajax":{
           "url":"../controller/doctor/list_doctor.php",
           type:'POST'
       },
       "order":[[1, 'asc']],
       "columns":[
           {"defaultContent":""},
           {"data":"document"},
           {"data":"doctor"},
           {"data":"tuiton"},
           {"data":"speciality"},
           {"data":"status",
           render: function (data, type, row ) {
               if(data=='ACTIVO'){
                   return "<span class='label label-success'>"+data+"</span>";                   
               }else{
                 return "<span class='label label-danger'>"+data+"</span>";                 
               }
             }
           }, 
           {"data":"cellphone"}, 
           {"defaultContent":"<button style='font-size:13px;' type='button' class='edit btn btn-primary'><i class='fa fa-edit'></i>"}
       ],

       "language":idioma_espanol,
       select: true
   });

   document.getElementById("doctor_table_filter").style.display="none";

    $('input.global_filter').on( 'keyup click', function () {
        filterGlobal();
    } );

    $('input.column_filter').on( 'keyup click', function () {
        filterColumn( $(this).parents('tr').attr('data-column') );
    });

    doctor_table.on( 'draw.dt', function () {
    var PageInfo = $('#doctor_table').DataTable().page.info();
    doctor_table.column(0, { page: 'current' }).nodes().each( function (cell, i) {
        cell.innerHTML = i + 1 + PageInfo.start;
    } );
    } );
}

function OpenModalRegister(){
    $("#register_modal").modal({backdrop: 'static', keyboard: false});
    $("#register_modal").modal('show');
}

function RegisterSpeciality(){
    var name = $("#txtName").val();
    var status = $("#cbxStatus").val();

    if(name.length == 0){
        return Swal.fire("Mensaje de Advertencia", "Llenar los campos vacíos", "warning");
    }

    $.ajax({
        url:'../controller/speciality/register_speciality.php',
        type: 'POST',
        data: {
            name: name,
            status: status
        }
    }).done(function(resp){
        if(resp>0){
            if(resp==1){
                $("#register_modal").modal('hide');
                ListSpeciality();
                CleanRegister();
                Swal.fire("Mensaje de Confirmación", "Datos guardados correctamente", "success");
            }else{
                CleanRegister();
                Swal.fire("Mensaje de Advertencia", "La especialidad ya existe", "warning");
            }
        }else{
            Swal.fire("Mensaje de Error", "Lo sentimos, no se pudo completar el registro", "error");
        }
    })
}

function CleanRegister(){
    $("#txtName").val("");
}

$('#speciality_table').on('click', '.edit', function(){
    var data = speciality_table.row($(this).parents('tr')).data();
    if(speciality_table.row(this).child.isShown()){
        var data = speciality_table.row(this).data();
    }
    $("#edit_modal").modal({backdrop:'static', keyboard:false});
    $("#edit_modal").modal('show');

    $("#speciality_id").val(data.speciality_id);
    $("#txtCurrentNameEdit").val(data.name);
    $("#txtNewNameEdit").val(data.name);
    $("#cbxStatusEdit").val(data.status).trigger("change");
})

function UpdateSpeciality(){
    var speciality_id = $("#speciality_id").val();
    var new_speciality = $("#txtNewNameEdit").val();
    var current_speciality = $("#txtCurrentNameEdit").val();
    var status = $("#cbxStatusEdit").val();

    if(new_speciality.length == "0"){
        return Swal.fire("Mensaje de Advertencia", "Debe ingresar el nombre de la especialidad", "warning");
    }

    $.ajax({
        url: '../controller/speciality/update_speciality.php',
        type: 'POST', 
        data: {
            speciality_id : speciality_id,
            new_speciality : new_speciality,
            current_speciality : current_speciality,
            status : status
        }
    }).done(function(resp){
        if(resp>0){
            $("#edit_modal").modal('hide');
            if(resp==1){
                ListSpeciality();
                Swal.fire("Mensaje de Confirmación", "Datos actualizados correctamente", "success");
            }else{
                Swal.fire("Mensaje de Advertencia", "Lo sentimos. La especialidad ya existe.", "warning");
            }
        }else{
            Swal.fire("Mensaje de Error", "Lo sentimos, no se pudo completar la actualización de datos.", "error");
        }
    })
}