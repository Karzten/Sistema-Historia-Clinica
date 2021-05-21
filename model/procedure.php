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

        function RegisterProcedure($name, $status){
            $sql = "CALL SP_REGISTER_PROCEDURE('$name','$status')";
            $array = array();
            if ($query = $this->connection->connection->query($sql)) {
                if($row = mysqli_fetch_array($query)){
                    return $id = trim($row[0]);
                }
                $this->connection->close();
            }
        }

        function UpdateProcedure($procedure_id, $current_procedure, $new_procedure, $status){
            $sql = "CALL SP_UPDATE_PROCEDURE('$procedure_id', '$current_procedure', '$new_procedure','$status')";
            $array = array();
            if ($query = $this->connection->connection->query($sql)) {
                if($row = mysqli_fetch_array($query)){
                    return $id = trim($row[0]);
                }
                $this->connection->close();
            }
        }


    }

    
?>