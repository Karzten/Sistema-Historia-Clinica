<?php 
    require '../../model/doctor.php';
    $DM = new doctor_model();
    $query = $DM->ListDoctor();
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