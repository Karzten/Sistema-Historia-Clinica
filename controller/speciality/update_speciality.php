<?php 
    require '../../model/speciality.php';
    $SM = new speciality_model();
    $speciality_id = htmlspecialchars($_POST['speciality_id'], ENT_QUOTES, 'UTF-8');
    $new_speciality = htmlspecialchars($_POST['new_speciality'], ENT_QUOTES, 'UTF-8');
    $current_speciality = htmlspecialchars($_POST['current_speciality'], ENT_QUOTES, 'UTF-8');
    $status = htmlspecialchars($_POST['status'], ENT_QUOTES, 'UTF-8');
    $query = $SM->UpdateSpeciality($speciality_id, $current_speciality, $new_speciality, $status);
    echo $query;
?>