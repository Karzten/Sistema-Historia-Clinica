var appointment_table;

function filterGlobal() {
    $('#appointment_table').DataTable().search(
        $('#global_filter').val(),
    ).draw();
}

function ListAppointment(){
    appointment_table = $("#appointment_table").DataTable({
       "ordering":false,
       "paging": false,
       "searching": { "regex": true },
       "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
       "pageLength": 10,
       "destroy":true,
       "async": false ,
       "processing": true,
       "ajax":{
           "url":"../controller/appointment/list_appointment.php",
           type:'POST'
       },
       "order":[[1, 'asc']],
       "columns":[
           {"defaultContent":""},
           {"data":"attention_number"},
           {"data":"register_date"},
           {"data":"patient"},
           {"data":"status",
           render: function (data, type, row ) {
               if(data=='PENDIENTE'){
                   return "<span class='label label-primary'>"+data+"</span>";                   
               }else if(data=='CANCELADO'){
                 return "<span class='label label-danger'>"+data+"</span>";                 
               } else{
                   return "<span class='label label-success'>"+data+"</span>";          
               }
             }
           }, 
           {"defaultContent":"<button style='font-size:13px;' type='button' class='edit btn btn-primary'><i class='fa fa-edit'></i>"}
       ],

       "language":idioma_espanol,
       select: true
   });

   document.getElementById("appointment_table_filter").style.display="none";

    $('input.global_filter').on( 'keyup click', function () {
        filterGlobal();
    } );

    $('input.column_filter').on( 'keyup click', function () {
        filterColumn( $(this).parents('tr').attr('data-column') );
    });

    appointment_table.on( 'draw.dt', function () {
    var PageInfo = $('#appointment_table').DataTable().page.info();
    appointment_table.column(0, { page: 'current' }).nodes().each( function (cell, i) {
        cell.innerHTML = i + 1 + PageInfo.start;
    } );
    } );
}

function OpenModalRegister(){
    $("#register_modal").modal({backdrop: 'static', keyboard: false});
    $("#register_modal").modal('show');
}

function ListComboPatient(){
    $.ajax({
        "url":"../controller/appointment/list_combo_patient.php",
        type:'POST'
    }).done(function(resp){
        var data = JSON.parse(resp);
        var chain = "";
        if(data.length>0){
            for(var i = 0; i < data.length; i++){
                chain+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
            }
            $("#cbxPatient").html(chain);
            $("#cbxPatientEdit").html(chain);
        }else{
            chain+="<option value=''>NO SE ENCONTRARON DATOS</option>";
            $("#cbxPatient").html(chain);
            $("#cbxPatientEdit").html(chain);
        }
    })
}

function RegisterAppointment(){
    var patient = $("#cbxPatient").val();
    var description = $("#txtDescription").val();
    var user_id = $("#main_id").val();

    if(patient.length==0){
        return Swal.fire("Mensaje de Advertencia", "Debe seleccionar un paciente", "warning");
    }

    if(description.length==0){
        return Swal.fire("Mensaje de Advertencia", "Debe ingresar una descripción", "warning");
    }

    $.ajax({
        url: '../controller/appointment/register_appointment.php',
        type: 'POST',
        data: {
            patient: patient,
            description: description,
            user_id: user_id
        }
    }).done(function(resp){
        if(resp>0){
            $("#register_modal").modal('hide');
            ListAppointment();
            CleanRegister();
            Swal.fire("Mensaje de Confirmación", "Datos guardados correctamente", "success");
        }else{
            Swal.fire("Mensaje de Error", "Lo sentimos, no se pudo completar el registro", "error");
        }
    })

}

