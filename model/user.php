<?php 
    class user_model
    {
        private $connection;
        function __construct(){
            require_once 'connection.php';
            $this->connection = new Connection();
            $this->connection->connect();
        }

        function VerifyUser($username, $password){
            $sql = "CALL SP_VERIFY_USER('$username')";
            $array = array();
            if ($query = $this->connection->connection->query($sql)){
                while ($query_VU = mysqli_fetch_array($query)) {
                    if(password_verify($password, $query_VU["password"]))
                    {
                        $array[] = $query_VU;
                    }
                }
                return $array;
                $this->connection->close();
            }
        }

        function ListUser(){
            $sql = "CALL SP_LIST_USER()";
            $array = array();
            if ($query = $this->connection->connection->query($sql)){
                while ($query_VU = mysqli_fetch_assoc($query)) {
                    $array["data"][]=$query_VU;
                }
                return $array;
                $this->connection->close();
            }
        }

        function ListComboRole(){
            $sql = "CALL SP_LIST_COMBO_ROLE()";
            $array = array();
            if ($query = $this->connection->connection->query($sql)){
                while ($query_VU = mysqli_fetch_array($query)) {   
                    $array[] = $query_VU;    
                }
                return $array;
                $this->connection->close();
            }
        }

        function RegisterUser($username, $password, $gender, $role){
            $sql = "CALL SP_REGISTER_USER('$username','$password','$gender','$role')";
            $array = array();
            if ($query = $this->connection->connection->query($sql)) {
                if($row = mysqli_fetch_array($query)){
                    return $id = trim($row[0]);
                }
                $this->connection->close();
            }
        }

        function UpdateStatus($user_id, $status){
            $sql = "CALL SP_UPDATE_USER_STATUS('$user_id','$status')";
            if ($query = $this->connection->connection->query($sql)) {
                return 1;
            }else{
                return 0;
            }
        }

        function UpdateUser($user_id, $gender, $role){
            $sql = "CALL SP_UPDATE_USER('$user_id','$gender','$role')";
            if ($query = $this->connection->connection->query($sql)) {
                return 1;
            }else{
                return 0;
            }
        }

        function DataUser($username){
            $sql = "CALL SP_VERIFY_USER('$username')";
            $array = array();
            if ($query = $this->connection->connection->query($sql)){
                while ($query_VU = mysqli_fetch_array($query)) {
                    $array[] = $query_VU;
                }
                return $array;
                $this->connection->close();
            }
        }
    }

    
?>