<?php 
    require '../../model/patient.php';
    $PM = new patient_model();
    $patient_id = htmlspecialchars($_POST['patient_id'], ENT_QUOTES, 'UTF-8');
    $current_document = htmlspecialchars($_POST['current_document'], ENT_QUOTES, 'UTF-8');
    $new_document = htmlspecialchars($_POST['new_document'], ENT_QUOTES, 'UTF-8');
    $paternal = htmlspecialchars($_POST['paternal'], ENT_QUOTES, 'UTF-8');
    $maternal = htmlspecialchars($_POST['maternal'], ENT_QUOTES, 'UTF-8');
    $name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
    $gender = htmlspecialchars($_POST['gender'], ENT_QUOTES, 'UTF-8');
    $cellphone = htmlspecialchars($_POST['cellphone'], ENT_QUOTES, 'UTF-8');
    $phone = htmlspecialchars($_POST['phone'], ENT_QUOTES, 'UTF-8');
    $adress = htmlspecialchars($_POST['adress'], ENT_QUOTES, 'UTF-8');
    $date = htmlspecialchars($_POST['date'], ENT_QUOTES, 'UTF-8');
    $status = htmlspecialchars($_POST['status'], ENT_QUOTES, 'UTF-8');
    $query = $PM->UpdatePatient($patient_id, $current_document, $new_document, $paternal, $maternal, $name, $gender, $cellphone, $phone, $adress, $date, $status);
    echo $query;
?>