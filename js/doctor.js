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


function ListComboRole(){
    $.ajax({
        "url":"../controller/user/list_combo_role.php",
        type:'POST'
    }).done(function(resp){
        var data = JSON.parse(resp);
        var chain = "";
        if(data.length>0){
            for(var i = 0; i < data.length; i++){
                if(data[i][0]=='2'){
                    chain+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
                }
            }
            $("#cbxRole").html(chain);
            $("#cbxRoleEdit").html(chain);
        }else{
            chain+="<option value=''>NO SE ENCONTRARON DATOS</option>";
            $("#cbxRole").html(chain);
            $("#cbxRoleEdit").html(chain);
        }
    })
}

function ListComboSpeciality(){
    $.ajax({
        "url":"../controller/doctor/list_combo_speciality.php",
        type:'POST'
    }).done(function(resp){
        var data = JSON.parse(resp);
        var chain = "";
        if(data.length>0){
            for(var i = 0; i < data.length; i++){
                chain+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
            }
            $("#cbxSpeciality").html(chain);
            $("#cbxSpecialityEdit").html(chain);
        }else{
            $("#cbxSpeciality").html(chain);
            $("#cbxSpecialityEdit").html(chain);
            chain+="<option value=''>NO SE ENCONTRARON DATOS</option>";
        }
    })
}

function RegisterDoctor(){
    var document = $("#txtDocument").val();
    var tuiton = $("#txtTuiton").val();
    var paternal = $("#txtPaternal").val();
    var maternal = $("#txtMaternal").val();
    var name = $("#txtName").val();
    var gender = $("#cbxGender").val();
    var cellphone = $("#txtCellphone").val();
    var phone = $("#txtPhone").val();
    var adress = $("#txtAdress").val();
    var date = $("#txtDate").val();
    var status = $("#cbxStatus").val();
    var speciality = $("#cbxSpeciality").val();
    var user = $("#txtUser").val();
    var password = $("#txtPassword").val();
    var role = $("#cbxRole").val();
    var email = $("#txtEmail").val();
    var validate = $("#validate_email").val();

    if(validate=="Incorrecto"){
        return Swal.fire("Mensaje de Advertencia", "El correo ingresado no tiene el formato correcto", "warning");
    }

    if(document.length==0 || tuiton.length==0 || paternal.length==0 || maternal.length==0 || name.length==0 || gender.length==0 || 
        date.length==0 || status.length==0 || speciality.length==0 || user.length==0 || password.length==0 || role.length==0 || email.length==0){
        return Swal.fire("Mensaje de Advertencia", "Llene los campos vacíos", "warning");
    }

    $.ajax({
        url: '../controller/doctor/register_doctor.php',
        type: 'POST',
        data: {
            document: document,
            tuiton: tuiton,
            paternal: paternal,
            maternal: maternal,
            name: name,
            gender: gender,
            cellphone: cellphone,
            phone: phone,
            adress: adress,
            date: date,
            status: status,
            speciality: speciality,
            user: user,
            password: password,
            role: role,
            email: email
        }
    }).done(function(resp){
        if(resp>0){
            if(resp==1){
                $("#register_modal").modal('hide');
                ListDoctor();
                CleanRegister();
                Swal.fire("Mensaje de Confirmación", "Datos guardados correctamente", "success");
            }else{
                CleanRegister();
                Swal.fire("Mensaje de Advertencia", "Lo sentimos, el médico ya se encuentra registrado", "warning");
            }
        }else{
            Swal.fire("Mensaje de Error", "Lo sentimos, no se pudo completar el registro", "error");
        }
    })

}

$('#doctor_table').on('click', '.edit', function(){
    var data = doctor_table.row($(this).parents('tr')).data();
    if(doctor_table.row(this).child.isShown()){
        var data = doctor_table.row(this).data();
    }
    $("#edit_modal").modal({backdrop:'static', keyboard:false});
    $("#edit_modal").modal('show');

    $("#doctor_id").val(data.doctor_id);
    $("#user_id").val(data.user_id);
    $("#txtCurrentDocumentEdit").val(data.document);
    $("#txtNewDocumentEdit").val(data.document);
    $("#txtCurrentTuitonEdit").val(data.tuiton);
    $("#txtNewTuitonEdit").val(data.tuiton);
    $("#txtPaternalEdit").val(data.paternal_surname);
    $("#txtMaternalEdit").val(data.maternal_surname);
    $("#txtNameEdit").val(data.name);
    $("#cbxGenderEdit").val(data.gender);
    $("#txtCellphoneEdit").val(data.cellphone);
    $("#txtPhoneEdit").val(data.phone);
    $("#txtAdressEdit").val(data.adress);
    $("#txtDateEdit").val(data.date_of_birth);
    $("#cbxStatusEdit").val(data.status).trigger("change");
    $("#cbxSpecialityEdit").val(data.speciality_id).trigger("change");
    $("#txtUserEdit").val(data.username)
    $("#cbxRoleEdit").val(data.role_id).trigger("change");
    $("#txtEmailEdit").val(data.email);
})

function UpdateDoctor(){
    var doctor_id = $("#doctor_id").val();
    var user_id = $("#user_id").val();
    var current_document = $("#txtCurrentDocumentEdit").val();
    var new_document = $("#txtNewDocumentEdit").val();
    var current_tuiton = $("#txtCurrentTuitonEdit").val();
    var new_tuiton = $("#txtNewTuitonEdit").val();
    var paternal = $("#txtPaternalEdit").val();
    var maternal = $("#txtMaternalEdit").val();
    var name = $("#txtNameEdit").val();
    var gender = $("#cbxGenderEdit").val();
    var cellphone = $("#txtCellphoneEdit").val();
    var phone = $("#txtPhoneEdit").val();
    var adress = $("#txtAdressEdit").val();
    var date = $("#txtDateEdit").val();
    var status = $("#cbxStatusEdit").val();
    var speciality = $("#cbxSpecialityEdit").val();
    var email = $("#txtEmailEdit").val();
    var validate = $("#validate_email_edit").val();

    if(validate=="Incorrecto"){
        return Swal.fire("Mensaje de Advertencia", "El correo ingresado no tiene el formato correcto", "warning");
    }

    if(doctor_id.length==0 || new_document.length==0 || new_tuiton.length==0 || paternal.length==0 || maternal.length==0 || name.length==0 || gender.length==0 || 
        date.length==0 || status.length==0 || speciality.length==0 || email.length==0){
        return Swal.fire("Mensaje de Advertencia", "Llene los campos vacíos", "warning");
    }

    $.ajax({
        url: '../controller/doctor/update_doctor.php',
        type: 'POST',
        data: {
            doctor_id : doctor_id,
            current_document: current_document,
            new_document:new_document,
            current_tuiton: current_tuiton,
            new_tuiton: new_tuiton,
            paternal: paternal,
            maternal: maternal,
            name: name,
            gender: gender,
            cellphone: cellphone,
            phone: phone,
            adress: adress,
            date: date,
            status: status,
            speciality: speciality,
            user_id: user_id,
            email: email
        }
    }).done(function(resp){
        if(resp>0){
            $("#edit_modal").modal('hide');
            if(resp==1){
                ListDoctor();
                Swal.fire("Mensaje de Confirmación", "Datos actualizados correctamente", "success");
            }else{
                Swal.fire("Mensaje de Advertencia", "Lo sentimos. El médico ya existe.", "warning");
            }
        }else{
            Swal.fire("Mensaje de Error", "Lo sentimos, no se pudo completar la actualización de datos.", "error");
        }
    })
}
