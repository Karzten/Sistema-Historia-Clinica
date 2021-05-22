<?php 
    require '../../model/supply.php';
    $SM = new supply_model();
    $supply_id = htmlspecialchars($_POST['supply_id'], ENT_QUOTES, 'UTF-8');
    $new_supply = htmlspecialchars($_POST['new_supply'], ENT_QUOTES, 'UTF-8');
    $current_supply = htmlspecialchars($_POST['current_supply'], ENT_QUOTES, 'UTF-8');
    $stock = htmlspecialchars($_POST['stock'], ENT_QUOTES, 'UTF-8');
    $status = htmlspecialchars($_POST['status'], ENT_QUOTES, 'UTF-8');
    $query = $SM->UpdateSupply($supply_id, $current_supply, $new_supply, $stock, $status);
    echo $query;
?>