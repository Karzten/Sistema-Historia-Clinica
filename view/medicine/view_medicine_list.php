<script type="text/javascript" src="../js/medicine.js?rev=<?php echo time();?>"></script>
<div class="col-md-12">
    <div class="box box-warning box-solid">
        <div class="box-header with-border">
              <h3 class="box-title">MANTENIMIENTO DE MEDICAMENTOS</h3>

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
                <button class="btn btn-danger" style="width:100%" onclick="OpenRegisterModal()"><i class="glyphicon glyphicon-plus"></i>Nuevo Medicamento</button>
              </div>
            </div>
              <table id="medicine_table" class="display responsive nowrap" style="width: 100%">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Alias</th>
                    <th>Stock</th>
                    <th>Fecha de registro</th>
                    <th>Estado</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Alias</th>
                    <th>Stock</th>
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


<div class="modal fade" id="register_modal" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Registro de Medicamentos</h4>
        </div>

        <div class="modal-body">

          <div class="col-lg-12">
            <label for="">Nombre</label>
            <input type="text" class="form-control" id="txtName" placeholder="Ingrese el nombre del medicamento"><br>
          </div>

          <div class="col-lg-12">
            <label for="">Alias</label>
            <input type="text" class="form-control" id="txtAlias" placeholder="Ingrese el alias del medicamento" onkeypress="return soloLetras(event)"><br>
          </div>

          <div class="col-lg-12">
            <label for="">Stock</label>
            <input type="text" class="form-control" id="txtStock" placeholder="Ingrese stock del medicamento" maxlength="5" onkeypress="return soloNumeros(event)"><br>
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
          <button class="btn btn-primary" onclick="RegisterMedicine()"><i class="fa fa-check"></i> Registrar</button>
          <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"></i> Cerrar</button>
        </div>

      </div>
    </div>
</div>

<script>
$(document).ready(function() {
    ListMedicine();
    $('.js-example-basic-single').select2();
    $("#register_modal").on('shown.bs.modal', function(){
        $("#txtName").focus();
    })
} );
</script>
