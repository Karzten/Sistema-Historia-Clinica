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

