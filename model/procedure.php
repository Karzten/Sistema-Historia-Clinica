<?php 
    class procedure_model
    {
        private $connection;
        function __construct(){
            require_once 'connection.php';
            $this->connection = new Connection();
            $this->connection->connect();
        }

        function ListProcedure(){
            $sql = "CALL SP_LIST_PROCEDURE()";
            $array = array();
            if ($query = $this->connection->connection->query($sql)){
                while ($query_VU = mysqli_fetch_assoc($query)) {
                    $array["data"][]=$query_VU;
                }
                return $array;
                $this->connection->close();
            }
        }

    }

    
?>