<?php 
    require '../../model/appointment.php';
    $AM = new appointment_model();
    $query = $AM->ListAppointment();
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