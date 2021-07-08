<?php 
    require '../../model/appointment.php';
    $AM = new appointment_model();
    $query = $AM->ListComboPatient();
    echo json_encode($query);
?>