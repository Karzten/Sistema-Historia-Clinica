<?php 
    require '../../model/doctor.php';
    $MM = new doctor_model();
    $query = $MM->ListComboSpeciality();
    echo json_encode($query);
?>