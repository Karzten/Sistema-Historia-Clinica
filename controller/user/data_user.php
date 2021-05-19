<?php 
    require '../../model/user.php';

    $UM = new user_model();
    $user = htmlspecialchars($_POST['user'], ENT_QUOTES, 'UTF-8');
    $query = $UM->DataUser($user);
    echo json_encode($query);
?>