<?php 
    require '../../model/patient.php';
    $PM = new patient_model();
    $query = $PM->ListPatient();
    if($query){
        echo json_encode($query);
    }else{
        echo '{
            "sEcho": 1,
            "iTotalRecords": "0",
            "iTotalDisplayRecords": "0",
            "aaData": []
        }';
    }
?>