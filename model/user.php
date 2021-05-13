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
    }

    
?>