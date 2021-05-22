var supply_table;

function filterGlobal() {
    $('#supply_table').DataTable().search(
        $('#global_filter').val(),
    ).draw();
}

function ListSupply(){
    supply_table = $("#supply_table").DataTable({
       "ordering":false,
       "paging": false,
       "searching": { "regex": true },
       "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
       "pageLength": 10,
       "destroy":true,
       "async": false ,
       "processing": true,
       "ajax":{
           "url":"../controller/supply/list_supply.php",
           type:'POST'
       },
       "order":[[1, 'asc']],
       "columns":[
           {"defaultContent":""},
           {"data":"name"},
           {"data":"stock"},
           {"data":"register_date"},
           {"data":"status",
           render: function (data, type, row ) {
               if(data=='ACTIVO'){
                   return "<span class='label label-success'>"+data+"</span>";                   
                }
               if(data=='INACTIVO'){
                 return "<span class='label label-danger'>"+data+"</span>";                 
                }
               if(data=='AGOTADO'){
                return "<span class='label label-black' style='background: black;'>"+data+"</span>";                 
                }
            }
            },  
           {"defaultContent":"<button style='font-size:13px;' type='button' class='edit btn btn-primary'><i class='fa fa-edit'></i>"}
       ],

       "language":idioma_espanol,
       select: true
   });

   document.getElementById("supply_table_filter").style.display="none";

    $('input.global_filter').on( 'keyup click', function () {
        filterGlobal();
    } );

    $('input.column_filter').on( 'keyup click', function () {
        filterColumn( $(this).parents('tr').attr('data-column') );
    });

    supply_table.on( 'draw.dt', function () {
    var PageInfo = $('#supply_table').DataTable().page.info();
    supply_table.column(0, { page: 'current' }).nodes().each( function (cell, i) {
        cell.innerHTML = i + 1 + PageInfo.start;
    } );
    } );
}

function OpenModalRegister(){
    $("#register_modal").modal({backdrop: 'static', keyboard: false});
    $("#register_modal").modal('show');
}

function RegisterSupply(){
    var name = $("#txtName").val();
    var stock = $("#txtStock").val();
    var status = $("#cbxStatus").val();

    if(name.length == 0){
        return Swal.fire("Mensaje de Advertencia", "Debe ingresar el nombre del insumo", "warning");
    }
    if(stock.length < 0){
        return Swal.fire("Mensaje de Advertencia", "El stock no puede ser negativo", "warning");
    }
    if(stock.length==0){
        return Swal.fire("Mensaje de Advertencia", "Debe ingresar el stock del insumo", "warning");
    }
    if(cbxStatus.length==0){
        return Swal.fire("Mensaje de Advertencia", "Debe ingresar el estado del insumo", "warning");
    }

    $.ajax({
        url:'../controller/supply/register_supply.php',
        type: 'POST',
        data: {
            name: name,
            stock: stock,
            status: status
        }
    }).done(function(resp){
        if(resp>0){
            if(resp==1){
                $("#register_modal").modal('hide');
                ListSupply();
                CleanRegister();
                Swal.fire("Mensaje de Confirmación", "Datos guardados correctamente", "success");
            }else{
                CleanRegister();
                Swal.fire("Mensaje de Advertencia", "El insumo ya existe", "warning");
            }
        }else{
            Swal.fire("Mensaje de Error", "Lo sentimos, no se pudo completar el registro", "error");
        }
    })
}

function CleanRegister(){
    $("#txtName").val("");
    $("#txtStock").val("");
}

$('#supply_table').on('click', '.edit', function(){
    var data = supply_table.row($(this).parents('tr')).data();
    if(supply_table.row(this).child.isShown()){
        var data = supply_table.row(this).data();
    }
    $("#edit_modal").modal({backdrop:'static', keyboard:false});
    $("#edit_modal").modal('show');

    $("#supply_id").val(data.supply_id);
    $("#txtCurrentNameEdit").val(data.name);
    $("#txtNewNameEdit").val(data.name);
    $("#txtStockEdit").val(data.stock);
    $("#cbxStatusEdit").val(data.status).trigger("change");
})

function UpdateSupply(){
    var supply_id = $("#supply_id").val();
    var new_supply = $("#txtNewNameEdit").val();
    var current_supply = $("#txtCurrentNameEdit").val();
    var stock = $("#txtStockEdit").val();
    var status = $("#cbxStatusEdit").val();

    if(new_supply.length == "0"){
        Swal.fire("Mensaje de Advertencia", "Debe ingresar el nombre del insumo", "warning");
    }

    $.ajax({
        url: '../controller/supply/update_supply.php',
        type: 'POST', 
        data: {
            supply_id : supply_id,
            new_supply : new_supply,
            current_supply : current_supply,
            stock : stock,
            status : status
        }
    }).done(function(resp){
        if(resp>0){
            $("#edit_modal").modal('hide');
            if(resp==1){
                ListSupply();
                Swal.fire("Mensaje de Confirmación", "Datos actualizados correctamente", "success");
            }else{
                Swal.fire("Mensaje de Advertencia", "Lo sentimos. El insumo ya existe.", "warning");
            }
        }else{
            Swal.fire("Mensaje de Error", "Lo sentimos, no se pudo completar la actualización de datos.", "error");
        }
    })
}