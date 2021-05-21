<?php 
    require '../../model/procedure.php';
    $PM = new procedure_model();
    $procedure_id = htmlspecialchars($_POST['procedure_id'], ENT_QUOTES, 'UTF-8');
    $new_procedure = htmlspecialchars($_POST['new_procedure'], ENT_QUOTES, 'UTF-8');
    $current_procedure = htmlspecialchars($_POST['current_procedure'], ENT_QUOTES, 'UTF-8');
    $status = htmlspecialchars($_POST['status'], ENT_QUOTES, 'UTF-8');
    $query = $PM->UpdateProcedure($procedure_id, $current_procedure, $new_procedure, $status);
    echo $query;
?>