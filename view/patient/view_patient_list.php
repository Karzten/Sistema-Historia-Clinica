<script type="text/javascript" src="../js/patient.js?rev=<?php echo time();?>"></script>
<div class="col-md-12">
    <div class="box box-warning box-solid">
        <div class="box-header with-border">
              <h3 class="box-title">MANTENIMIENTO DE PACIENTE</h3>

            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
            </div>
              <!-- /.box-tools -->
        </div>
            <!-- /.box-header -->
            <div class="box-body">
            <div class="form-group">
              <div class="col-lg-10">
                <div class="input-group">
                  <input type="text" class="global_filter form-control" id="global_filter" placeholder="Ingresar dato a buscar">
                  <span class="input-group-addon"><i class="fa fa-search"></i></span>
                </div>
              </div>
              <div class="col-lg-2">
                <button class="btn btn-danger" style="width:100%" onclick="OpenRegisterModal()"><i class="glyphicon glyphicon-plus"></i>Nuevo Paciente</button>
              </div>
            </div>
              <table id="patient_table" class="display responsive nowrap" style="width: 100%">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nro Documento</th>
                    <th>Paciente</th>
                    <th>Dirección</th>
                    <th>Sexo</th>
                    <th>Celular</th>
                    <th>Estado</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>#</th>
                    <th>Nro Documento</th>
                    <th>Paciente</th>
                    <th>Dirección</th>
                    <th>Sexo</th>
                    <th>Celular</th>
                    <th>Estado</th>
                    <th>Acción</th>
                  </tr>
                </tfoot>
              </table>
            </div>
            <!-- /.box-body -->
    </div>
          <!-- /.box -->
</div>


<div class="modal fade" id="register_modal" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Registro de Paciente</h4>
        </div>

        <div class="modal-body">
          <div class="row">
            <div class="col-lg-12">
              <label for="">N° Documento</label>
              <input type="text" class="form-control" id="txtDocument" placeholder="Ingresar número de documento" onkeypress="return soloNumeros(event)"><br>
            </div>

            <div class="col-lg-6">
              <label for="">Apellido Paterno</label>
              <input type="text" class="form-control" id="txtPaternal" placeholder="Ingrese el apellido paterno" onkeypress="return soloLetras(event)"><br>
            </div>

            <div class="col-lg-6">
              <label for="">Apellido Materno</label>
              <input type="text" class="form-control" id="txtMaternal" placeholder="Ingrese el apellido materno" onkeypress="return soloLetras(event)"><br>
            </div>

            <div class="col-lg-12">
              <label for="">Nombre</label>
              <input type="text" class="form-control" id="txtName" placeholder="Ingrese nombre del médico" onkeypress="return soloLetras(event)"><br>
            </div>

            <div class="col-lg-4">
              <label for="">Sexo</label>
              <select class="js-example-basic-single" name="state" id="cbxGender" style="width:100%;">
                <option value="">Seleccione su género...</option>
                <option value="MASCULINO">MASCULINO</option>
                <option value="FEMENINO">FEMENINO</option>
              </select><br><br>
            </div>

            <div class="col-lg-4">
              <label for="">Celular</label>
              <input type="text" class="form-control" id="txtCellphone" placeholder="Ingrese número de celular" onkeypress="return soloNumeros(event)"><br>
            </div>

            <div class="col-lg-4">
              <label for="">Teléfono</label>
              <input type="text" class="form-control" id="txtPhone" placeholder="Ingrese número de teléfono" onkeypress="return soloNumeros(event)"><br>
            </div>

            <div class="col-lg-6">
              <label for="">Dirección</label>
              <input type="text" class="form-control" id="txtAdress" placeholder="Ingrese la dirección"><br>
            </div>

            <div class="col-lg-6">
              <label for="">Fecha de nacimiento</label>
              <input type="date" class="form-control" id="txtDate"><br>
            </div>

            <div class="col-lg-12">
              <label for="">Estado</label>
              <select class="js-example-basic-single" name="state" id="cbxStatus" style="width:100%;">
                <option value="ACTIVO">ACTIVO</option>
                <option value="INACTIVO">INACTIVO</option>
              </select><br><br>
            </div>

          </div>

            <div class="modal-footer">
              <button class="btn btn-primary" onclick="RegisterPatient()"><i class="fa fa-check"></i> Registrar</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"></i> Cerrar</button>
            </div>

        </div>
          

      </div>
    </div>
</div>

<script>
$(document).ready(function() {
    ListPatient();
    $('.js-example-basic-single').select2();
    $("#register_modal").on('shown.bs.modal', function(){
        $("#txtName").focus();
    })
} );

document.getElementById('txtEmail').addEventListener('input', function() {
    campo = event.target;
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if(emailRegex.test(campo.value)){
      $(this).css("border","");
      $("#lblEmail").html("");
      $("#validate_email").val("Correcto");
    }else{
      $(this).css("border", "1px solid red");
      $("#lblEmail").html("Correo incorrecto");
      $("#validate_email").val("Incorrecto");
    }
});

document.getElementById('txtEmailEdit').addEventListener('input', function() {
    campo = event.target;
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if(emailRegex.test(campo.value)){
      $(this).css("border","");
      $("#lblEmailEdit").html("");
      $("#validate_email_edit").val("Correcto");
    }else{
      $(this).css("border", "1px solid red");
      $("#lblEmailEdit").html("Correo incorrecto");
      $("#validate_email_edit").val("Incorrecto");
    }
});
</script>