<?php 
    require '../../model/user.php';
    $UM = new user_model();
    $username = htmlspecialchars($_POST['username'], ENT_QUOTES, 'UTF-8');
    $password = htmlspecialchars($_POST['password'], ENT_QUOTES, 'UTF-8');

    $query = $UM->VerifyUser($username, $password);
    $data = json_encode($query);
    if(count($query)>0){
        echo $data;
    }else{
        echo 0;
    }
?>