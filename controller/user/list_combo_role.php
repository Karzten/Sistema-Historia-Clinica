<?php 
    require '../../model/user.php';
    $UM = new user_model();
    $query = $UM->ListComboRole();
    echo json_encode($query);
?>