<?php 
    require '../../model/user.php';
    $UM = new user_model();
    $username = htmlspecialchars($_POST['username'], ENT_QUOTES, 'UTF-8');
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT, ['cost'=>10]);
    $gender = htmlspecialchars($_POST['gender'], ENT_QUOTES, 'UTF-8');
    $role = htmlspecialchars($_POST['role'], ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($_POST['email'], ENT_QUOTES, 'UTF-8');
    $query = $UM->RegisterUser($username, $password, $gender, $role, $email);
    echo $query;
    
?>