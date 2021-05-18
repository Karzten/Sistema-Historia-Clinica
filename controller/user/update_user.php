<?php 
    require '../../model/user.php';
    $UM = new user_model();
    $user_id = htmlspecialchars($_POST['user_id'], ENT_QUOTES, 'UTF-8');
    $gender = htmlspecialchars($_POST['gender'], ENT_QUOTES, 'UTF-8');
    $role = htmlspecialchars($_POST['role'], ENT_QUOTES, 'UTF-8');
    $query = $UM->UpdateUser($user_id, $gender, $role);
    echo $query;
    
?>