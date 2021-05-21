<?php 
    require '../../model/user.php';

    $UM = new user_model();
    $username = htmlspecialchars($_POST['username'], ENT_QUOTES, 'UTF-8');
    $query = $UM->UpdateAttempt($username);
    echo $query;
?>