<?php 
    $user_id = $_POST['user_id'];
    $user = $_POST['user'];
    $role = $_POST['role'];

    session_start();
    $_SESSION['S_user_id']=$user_id;
    $_SESSION['S_user']=$user;
    $_SESSION['S_role']=$role;
?>