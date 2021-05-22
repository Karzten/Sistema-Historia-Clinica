<?php 
    require '../../model/medicine.php';
    $MM = new medicine_model();
    $query = $MM->ListMedicine();
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