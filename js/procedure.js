var procedure_table;

function filterGlobal() {
    $('#procedure_table').DataTable().search(
        $('#global_filter').val(),
    ).draw();
}

function ListProcedure(){
    procedure_table = $("#procedure_table").DataTable({
       "ordering":false,
       "paging": false,
       "searching": { "regex": true },
       "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
       "pageLength": 10,
       "destroy":true,
       "async": false ,
       "processing": true,
       "ajax":{
           "url":"../controller/procedure/list_procedure.php",
           type:'POST'
       },
       "order":[[1, 'asc']],
       "columns":[
           {"defaultContent":""},
           {"data":"name"},
           {"data":"register_date"},
           {"data":"status",
           render: function (data, type, row ) {
               if(data=='ACTIVO'){
                   return "<span class='label label-success'>"+data+"</span>";                   
               }else{
                 return "<span class='label label-danger'>"+data+"</span>";                 
               }
             }
           },  
           {"defaultContent":"<button style='font-size:13px;' type='button' class='edit btn btn-primary'><i class='fa fa-edit'></i>"}
       ],

       "language":idioma_espanol,
       select: true
   });

   document.getElementById("procedure_table_filter").style.display="none";

    $('input.global_filter').on( 'keyup click', function () {
        filterGlobal();
    } );

    $('input.column_filter').on( 'keyup click', function () {
        filterColumn( $(this).parents('tr').attr('data-column') );
    });

    procedure_table.on( 'draw.dt', function () {
    var PageInfo = $('#procedure_table').DataTable().page.info();
    procedure_table.column(0, { page: 'current' }).nodes().each( function (cell, i) {
        cell.innerHTML = i + 1 + PageInfo.start;
    } );
    } );
}

function OpenModalRegister(){
    $("#register_modal").modal({backdrop: 'static', keyboard: false});
    $("#register_modal").modal('show');
}

function RegisterProcedure(){
    var name = $("#txtName").val();
    var status = $("#cbxStatus").val();

    if(name.length == 0){
        Swal.fire("Mensaje de Advertencia", "Llenar los campos vacíos", "warning");
    }

    $.ajax({
        url:'../controller/procedure/register_procedure.php',
        type: 'POST',
        data: {
            name: name,
            status: status
        }
    }).done(function(resp){
        if(resp>0){
            if(resp==1){
                $("#register_modal").modal('hide');
                ListProcedure();
                CleanRegister();
                Swal.fire("Mensaje de Confirmación", "Datos guardados correctamente", "success");
            }else{
                CleanRegister();
                Swal.fire("Mensaje de Advertencia", "El procedimiento médico ya existe", "warning");
            }
        }else{
            Swal.fire("Mensaje de Error", "Lo sentimos, no se pudo completar el registro", "error");
        }
    })
}

function CleanRegister(){
    $("#txtName").val("");
}

$('#procedure_table').on('click', '.edit', function(){
    var data = procedure_table.row($(this).parents('tr')).data();
    if(procedure_table.row(this).child.isShown()){
        var data = procedure_table.row(this).data();
    }
    $("#edit_modal").modal({backdrop:'static', keyboard:false});
    $("#edit_modal").modal('show');

    $("#procedure_id").val(data.procedure_id);
    $("#txtCurrentNameEdit").val(data.name);
    $("#txtNewNameEdit").val(data.name);
    $("#cbxStatusEdit").val(data.status).trigger("change");
})

function UpdateProcedure(){
    var procedure_id = $("#procedure_id").val();
    var new_procedure = $("#txtNewNameEdit").val();
    var current_procedure = $("#txtCurrentNameEdit").val();
    var status = $("#cbxStatusEdit").val();

    if(new_procedure.length == "0"){
        Swal.fire("Mensaje de Advertencia", "Debe ingresar un procedimiento médico", "warning");
    }

    $.ajax({
        url: '../controller/procedure/update_procedure.php',
        type: 'POST', 
        data: {
            procedure_id : procedure_id,
            new_procedure : new_procedure,
            current_procedure : current_procedure,
            status : status
        }
    }).done(function(resp){
        if(resp>0){
            $("#edit_modal").modal('hide');
            if(resp==1){
                ListProcedure();
                Swal.fire("Mensaje de Confirmación", "Datos actualizados correctamente", "success");
            }else{
                Swal.fire("Mensaje de Advertencia", "Lo sentimos. El procedimiento ya existe.", "warning");
            }
        }else{
            Swal.fire("Mensaje de Error", "Lo sentimos, no se pudo completar la actualización de datos.", "error");
        }
    })
}