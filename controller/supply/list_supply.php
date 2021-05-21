<?php 
    require '../../model/supply.php';
    $SM = new supply_model();
    $query = $SM->ListSupply();
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