<?php 
    require '../../model/user.php';

    $UM = new user_model();
    $user_id = htmlspecialchars($_POST['user_id'], ENT_QUOTES, 'UTF-8');
    $password_database = htmlspecialchars($_POST['password_database'], ENT_QUOTES, 'UTF-8');
    $current_password = htmlspecialchars($_POST['current_password'], ENT_QUOTES, 'UTF-8');
    $new_password = password_hash($_POST['new_password'], PASSWORD_DEFAULT, ['cost'=>12]);
    if(password_verify($current_password,$password_database)){
        $query = $UM->UpdatePassword($user_id, $new_password);
        echo $query;
    }else{
        echo 2;
    }
?>