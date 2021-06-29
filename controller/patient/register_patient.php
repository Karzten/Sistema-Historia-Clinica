<?php 
    require '../../model/patient.php';
    $PM = new patient_model();
    $document = htmlspecialchars($_POST['document'], ENT_QUOTES, 'UTF-8');
    $paternal = htmlspecialchars($_POST['paternal'], ENT_QUOTES, 'UTF-8');
    $maternal = htmlspecialchars($_POST['maternal'], ENT_QUOTES, 'UTF-8');
    $name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
    $gender = htmlspecialchars($_POST['gender'], ENT_QUOTES, 'UTF-8');
    $cellphone = htmlspecialchars($_POST['cellphone'], ENT_QUOTES, 'UTF-8');
    $phone = htmlspecialchars($_POST['phone'], ENT_QUOTES, 'UTF-8');
    $adress = htmlspecialchars($_POST['adress'], ENT_QUOTES, 'UTF-8');
    $date = htmlspecialchars($_POST['date'], ENT_QUOTES, 'UTF-8');
    $query = $PM->RegisterPatient($document, $paternal, $maternal, $name, $gender, $cellphone, $phone, $adress, $date);
    echo $query;
?>