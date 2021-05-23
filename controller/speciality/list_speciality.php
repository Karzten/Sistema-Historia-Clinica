<?php 
    require '../../model/speciality.php';
    $SM = new speciality_model();
    $query = $SM->ListSpeciality();
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