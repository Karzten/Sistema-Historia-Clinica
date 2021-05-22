<?php 
    require '../../model/supply.php';
    $SM = new supply_model();
    $name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
    $stock = htmlspecialchars($_POST['stock'], ENT_QUOTES, 'UTF-8');
    $status = htmlspecialchars($_POST['status'], ENT_QUOTES, 'UTF-8');
    $query = $SM->RegisterSupply($name, $stock, $status);
    echo $query;
?>