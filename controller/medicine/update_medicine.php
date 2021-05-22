<?php 
    require '../../model/medicine.php';
    $MM = new medicine_model();
    $medicine_id = htmlspecialchars($_POST['medicine_id'], ENT_QUOTES, 'UTF-8');
    $current_medicine = htmlspecialchars($_POST['current_medicine'], ENT_QUOTES, 'UTF-8');
    $new_medicine = htmlspecialchars($_POST['new_medicine'], ENT_QUOTES, 'UTF-8');
    $alias = htmlspecialchars($_POST['alias'], ENT_QUOTES, 'UTF-8');
    $stock = htmlspecialchars($_POST['stock'], ENT_QUOTES, 'UTF-8');
    $status = htmlspecialchars($_POST['status'], ENT_QUOTES, 'UTF-8');
    $query = $MM->UpdateMedicine($medicine_id, $current_medicine, $new_medicine, $alias, $stock, $status);
    echo $query;
?>