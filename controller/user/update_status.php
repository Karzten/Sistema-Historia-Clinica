<?php 
    require '../../model/user.php';

    $UM = new user_model();
    $user_id = htmlspecialchars($_POST['user_id'], ENT_QUOTES, 'UTF-8');
    $status = htmlspecialchars($_POST['status'], ENT_QUOTES, 'UTF-8');
    $query = $UM->UpdateStatus($user_id, $status);
    echo $query;
?>