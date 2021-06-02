<?php 
    require '../../model/doctor.php';
    $DM = new doctor_model();
    $doctor_id = htmlspecialchars($_POST['doctor_id'], ENT_QUOTES, 'UTF-8');
    $current_document = htmlspecialchars($_POST['current_document'], ENT_QUOTES, 'UTF-8');
    $new_document = htmlspecialchars($_POST['new_document'], ENT_QUOTES, 'UTF-8');
    $current_tuiton = htmlspecialchars($_POST['current_tuiton'], ENT_QUOTES, 'UTF-8');
    $new_tuiton = htmlspecialchars($_POST['new_tuiton'], ENT_QUOTES, 'UTF-8');
    $paternal = htmlspecialchars($_POST['paternal'], ENT_QUOTES, 'UTF-8');
    $maternal = htmlspecialchars($_POST['maternal'], ENT_QUOTES, 'UTF-8');
    $name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
    $gender = htmlspecialchars($_POST['gender'], ENT_QUOTES, 'UTF-8');
    $cellphone = htmlspecialchars($_POST['cellphone'], ENT_QUOTES, 'UTF-8');
    $phone = htmlspecialchars($_POST['phone'], ENT_QUOTES, 'UTF-8');
    $adress = htmlspecialchars($_POST['adress'], ENT_QUOTES, 'UTF-8');
    $date = htmlspecialchars($_POST['date'], ENT_QUOTES, 'UTF-8');
    $speciality = htmlspecialchars($_POST['speciality'], ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($_POST['email'], ENT_QUOTES, 'UTF-8');
    $user_id = htmlspecialchars($_POST['user_id'], ENT_QUOTES, 'UTF-8');
    $status = htmlspecialchars($_POST['status'], ENT_QUOTES, 'UTF-8');
    $query = $DM->UpdateDoctor($doctor_id, $current_document, $new_document, $current_tuiton, $new_tuiton, $paternal, $maternal, $name, $gender, $cellphone, $phone, $adress, $date, $speciality, $user_id, $email, $status);
    echo $query;
?>