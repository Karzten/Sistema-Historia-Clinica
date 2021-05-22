<?php 
    require '../../model/medicine.php';
    $MM = new medicine_model();
    $name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
    $alias = htmlspecialchars($_POST['alias'], ENT_QUOTES, 'UTF-8');
    $stock = htmlspecialchars($_POST['stock'], ENT_QUOTES, 'UTF-8');
    $status = htmlspecialchars($_POST['status'], ENT_QUOTES, 'UTF-8');
    $query = $MM->RegisterMedicine($name, $alias, $stock, $status);
    echo $query;
?>