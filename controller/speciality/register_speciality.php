<?php 
    require '../../model/speciality.php';
    $SM = new speciality_model();
    $name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
    $status = htmlspecialchars($_POST['status'], ENT_QUOTES, 'UTF-8');
    $query = $SM->RegisterSpeciality($name, $status);
    echo $query;
?>