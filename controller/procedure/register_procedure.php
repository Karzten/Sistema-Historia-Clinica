<?php 
    require '../../model/procedure.php';
    $PM = new procedure_model();
    $name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
    $status = htmlspecialchars($_POST['status'], ENT_QUOTES, 'UTF-8');
    $query = $PM->RegisterProcedure($name, $status);
    echo $query;
?>