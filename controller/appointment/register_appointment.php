<?php 
    require '../../model/appointment.php';
    $DM = new appointment_model();
    $patient = htmlspecialchars($_POST['patient'], ENT_QUOTES, 'UTF-8');
    $description = htmlspecialchars($_POST['description'], ENT_QUOTES, 'UTF-8');
    $user_id = htmlspecialchars($_POST['user_id'], ENT_QUOTES, 'UTF-8');
    $query = $DM->RegisterAppointment($patient, $description, $user_id);
    echo $query;
?>