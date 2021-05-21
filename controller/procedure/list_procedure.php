<?php 
    require '../../model/procedure.php';
    $PM = new procedure_model();
    $query = $PM->ListProcedure();
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