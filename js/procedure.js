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
           {"defaultContent":"<button style='font-size:13px;' type='button' class='edit btn btn-primary'><i class='fa fa-edit'></i>&nbsp;<button style='font-size:13px;' type='button' class='desactivate btn btn-danger'><i class='fa fa-trash'></i>&nbsp;<button style='font-size:13px;' type='button' class='activate btn btn-success'><i class='fa fa-check'></i>"}
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
        alert(resp);
        if(resp>0){
            if(resp==1){
                $("#register_modal").modal('hide');
                ListProcedure();
                Swal.fire("Mensaje de Confirmación", "Datos guardados correctamente", "success");
            }else{
                Swal.fire("Mensaje de Advertencia", "El procedimiento médico ya existe", "warning");
            }
        }
    })
}