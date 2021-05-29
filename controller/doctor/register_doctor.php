<?php 
    require '../../model/doctor.php';
    $DM = new doctor_model();
    $document = htmlspecialchars($_POST['document'], ENT_QUOTES, 'UTF-8');
    $tuiton = htmlspecialchars($_POST['tuiton'], ENT_QUOTES, 'UTF-8');
    $paternal = htmlspecialchars($_POST['paternal'], ENT_QUOTES, 'UTF-8');
    $maternal = htmlspecialchars($_POST['maternal'], ENT_QUOTES, 'UTF-8');
    $name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
    $gender = htmlspecialchars($_POST['gender'], ENT_QUOTES, 'UTF-8');
    $cellphone = htmlspecialchars($_POST['cellphone'], ENT_QUOTES, 'UTF-8');
    $phone = htmlspecialchars($_POST['phone'], ENT_QUOTES, 'UTF-8');
    $adress = htmlspecialchars($_POST['adress'], ENT_QUOTES, 'UTF-8');
    $date = htmlspecialchars($_POST['date'], ENT_QUOTES, 'UTF-8');
    $speciality = htmlspecialchars($_POST['speciality'], ENT_QUOTES, 'UTF-8');
    $user = htmlspecialchars($_POST['user'], ENT_QUOTES, 'UTF-8');
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT, ['cost'=>10]);
    $role = htmlspecialchars($_POST['role'], ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($_POST['email'], ENT_QUOTES, 'UTF-8');
    $query = $DM->RegisterDoctor($document, $tuiton, $paternal, $maternal, $name, $cellphone, $phone, $adress, $date, $speciality, $user, $password, $gender, $role, $email);
    echo $query;
?>