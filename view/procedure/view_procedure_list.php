<script type="text/javascript" src="../js/procedure.js?rev=<?php echo time();?>"></script>
<div class="col-md-12">
    <div class="box box-warning box-solid">
        <div class="box-header with-border">
              <h3 class="box-title">MANTENIMIENTO DE PROCEDIMIENTOS MÉDICOS</h3>

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
                <button class="btn btn-danger" style="width:100%" onclick="OpenRegisterModal()"><i class="glyphicon glyphicon-plus"></i>Nuevo Procedimiento</button>
              </div>
            </div>
              <table id="procedure_table" class="display responsive nowrap" style="width: 100%">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Fecha de registro</th>
                    <th>Estado</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Fecha de registro</th>
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

<form action="" autocomplete="false" onsubmit="return false">
  <div class="modal fade" id="register_modal" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Registro de Usuario</h4>
        </div>

        <div class="modal-body">

          <div class="col-lg-12">
            <label for="">Usuario</label>
            <input type="text" class="form-control" id="txtUsername" placeholder="Ingrese nombre de usuario"><br>
          </div>

          <div class="col-lg-12">
            <label for="">Correo electrónico</label>
            <input type="text" class="form-control" id="txtEmail" placeholder="Ingrese correo">
            <label for="" id="lblEmail" style="color: red;"></label>
            <input type="text" id="validate_email" hidden>
          </div>

          <div class="col-lg-12">
            <label for="">Contraseña</label>
            <input type="password" class="form-control" id="txtPassword" placeholder="Ingrese contraseña"><br>
          </div>

          <div class="col-lg-12">
            <label for="">Repita la contraseña</label>
            <input type="password" class="form-control" id="txtConfirmation" placeholder="Repita la contraseña"><br>
          </div>

          <div class="col-lg-12">
            <label for="">Sexo</label>
            <select class="js-example-basic-single" name="state" id="cbxGender" style="width:100%;">
              <option value="MASCULINO">MASCULINO</option>
              <option value="FEMENINO">FEMENINO</option>
            </select><br><br>
          </div>

          <div class="col-lg-12">
            <label for="">Rol</label>
            <select class="js-example-basic-single" name="state" id="cbxRole" style="width:100%;">

            </select><br><br>
          </div>

        </div>

        <div class="modal-footer">
          <button class="btn btn-primary" onclick="RegisterUser()"><i class="fa fa-check"></i> Registrar</button>
          <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"></i> Cerrar</button>
        </div>

      </div>
    </div>
  </div>
</form>

<form action="" autocomplete="false" onsubmit="return false">
  <div class="modal fade" id="edit_modal" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Editar usuario</h4>
        </div>

        <div class="modal-body">

          <div class="col-lg-12">
            <input type="text" id="user_id" hidden>
            <label for="">Usuario</label>
            <input type="text" class="form-control" id="txtUsernameEdit" placeholder="Ingrese nombre de usuario" disabled><br>
          </div>

          <div class="col-lg-12">
            <label for="">Correo electrónico</label>
            <input type="text" class="form-control" id="txtEmailEdit" placeholder="Ingrese correo">
            <label for="" id="lblEmailEdit" style="color: red;"></label>
            <input type="text" id="validate_email_edit" hidden>
          </div>

          <div class="col-lg-12">
            <label for="">Sexo</label>
            <select class="js-example-basic-single" name="state" id="cbxGenderEdit" style="width:100%;">
              <option value="MASCULINO">MASCULINO</option>
              <option value="FEMENINO">FEMENINO</option>
            </select><br><br>
          </div>

          <div class="col-lg-12">
            <label for="">Rol</label>
            <select class="js-example-basic-single" name="state" id="cbxRoleEdit" style="width:100%;">

            </select><br><br>
          </div>

        </div>

        <div class="modal-footer">
          <button class="btn btn-primary" onclick="UpdateUser()"><i class="fa fa-check"></i> Guardar</button>
          <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"></i> Cerrar</button>
        </div>

      </div>
    </div>
  </div>
</form>

<script>
$(document).ready(function() {
    ListProcedure();
    $('.js-example-basic-single').select2();
    $("#register_modal").on('shown.bs.modal', function(){
        $("#txtUsername").focus();
    })
} );
</script>