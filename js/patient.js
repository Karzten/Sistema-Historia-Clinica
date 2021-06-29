var patient_table;

function filterGlobal() {
    $('#patient_table').DataTable().search(
        $('#global_filter').val(),
    ).draw();
}

function ListPatient(){
    patient_table = $("#patient_table").DataTable({
       "ordering":false,
       "paging": false,
       "searching": { "regex": true },
       "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
       "pageLength": 10,
       "destroy":true,
       "async": false ,
       "processing": true,
       "ajax":{
           "url":"../controller/patient/list_patient.php",
           type:'POST'
       },
       "order":[[1, 'asc']],
       "columns":[
           {"defaultContent":""},
           {"data":"document"},
           {"data":"patient"},
           {"data":"adress"},
           {"data":"gender"},
           {"data":"cellphone"},
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

   document.getElementById("patient_table_filter").style.display="none";

    $('input.global_filter').on( 'keyup click', function () {
        filterGlobal();
    } );

    $('input.column_filter').on( 'keyup click', function () {
        filterColumn( $(this).parents('tr').attr('data-column') );
    });

    patient_table.on( 'draw.dt', function () {
    var PageInfo = $('#patient_table').DataTable().page.info();
    patient_table.column(0, { page: 'current' }).nodes().each( function (cell, i) {
        cell.innerHTML = i + 1 + PageInfo.start;
    } );
    } );
}

function OpenModalRegister(){
    $("#register_modal").modal({backdrop: 'static', keyboard: false});
    $("#register_modal").modal('show');
}

function RegisterPatient(){
    
    var document = $("#txtDocument").val();
    var paternal = $("#txtPaternal").val();
    var maternal = $("#txtMaternal").val();
    var name = $("#txtName").val();
    var gender = $("#cbxGender").val();
    var cellphone = $("#txtCellphone").val();
    var phone = $("#txtPhone").val();
    var adress = $("#txtAdress").val();
    var date = $("#txtDate").val();
    var status = $("#cbxStatus").val();
    
    if(paternal.length == 0){
        return Swal.fire("Mensaje de Advertencia", "Debe ingresar el apellido paterno del paciente", "warning");
    }

    if(maternal.length == 0){
        return Swal.fire("Mensaje de Advertencia", "Debe ingresar el apellido materno del paciente", "warning");
    }

    if(name.length == 0){
        return Swal.fire("Mensaje de Advertencia", "Debe ingresar el nombre del paciente", "warning");
    }

    if(cbxStatus.length==0){
        return Swal.fire("Mensaje de Advertencia", "Debe ingresar el estado del insumo", "warning");
    }

    $.ajax({
        url:'../controller/patient/register_patient.php',
        type: 'POST',
        data: {
            document: document,
            paternal: paternal,
            maternal: maternal,
            name: name,
            gender: gender,
            cellphone: cellphone,
            phone: phone,
            adress: adress,
            date: date,
            status: status,
        }
    }).done(function(resp){
        alert(resp);
        if(resp>0){
            if(resp==1){
                $("#register_modal").modal('hide');
                ListPatient();
                CleanRegister();
                Swal.fire("Mensaje de Confirmación", "Datos guardados correctamente", "success");
            }else{
                CleanRegister();
                Swal.fire("Mensaje de Advertencia", "El paciente ya existe", "warning");
            }
        }else{
            Swal.fire("Mensaje de Error", "Lo sentimos, no se pudo completar el registro", "error");
        }
    })
}

function CleanRegister(){
    $("#txtDocument").val("");
    $("#txtPaternal").val("");
    $("#txtMaternal").val("");
    $("#txtName").val("");
    $("#cbxGender").val("");
    $("#txtCellphone").val("");
    $("#txtPhone").val("");
    $("#txtAdress").val("");
    $("#txtDate").val("");
    $("#cbxStatus").val("");
}

$('#patient_table').on('click', '.edit', function(){
    var data = patient_table.row($(this).parents('tr')).data();
    if(patient_table.row(this).child.isShown()){
        var data = patient_table.row(this).data();
    }
    $("#edit_modal").modal({backdrop:'static', keyboard:false});
    $("#edit_modal").modal('show');

    $("#supply_id").val(data.supply_id);
    $("#txtCurrentNameEdit").val(data.name);
    $("#txtNewNameEdit").val(data.name);
    $("#txtStockEdit").val(data.stock);
    $("#cbxStatusEdit").val(data.status).trigger("change");
})

function UpdatePatient(){
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