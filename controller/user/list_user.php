<?php 
    require '../../model/user.php';
    $UM = new user_model();
    $query = $UM->ListUser();
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