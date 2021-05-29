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
        }else{
            chain+="<option value=''>NO SE ENCONTRARON DATOS</option>";
            $("#cbxRole").html(chain);
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
        }else{
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
        alert(resp);
    })

}

