<?php 
    class medicine_model
    {
        private $connection;
        function __construct(){
            require_once 'connection.php';
            $this->connection = new Connection();
            $this->connection->connect();
        }

        function ListMedicine(){
            $sql = "CALL SP_LIST_MEDICINE()";
            $array = array();
            if ($query = $this->connection->connection->query($sql)){
                while ($query_VU = mysqli_fetch_assoc($query)) {
                    $array["data"][]=$query_VU;
                }
                return $array;
                $this->connection->close();
            }
        }

        function RegisterMedicine($name, $alias, $stock, $status){
            $sql = "CALL SP_REGISTER_MEDICINE('$name', '$alias', '$stock', '$status')";
            $array = array();
            if ($query = $this->connection->connection->query($sql)) {
                if($row = mysqli_fetch_array($query)){
                    return $id = trim($row[0]);
                }
                $this->connection->close();
            }
        }

        function UpdateMedicine($medicine_id, $current_medicine, $new_medicine, $alias, $stock, $status){
            $sql = "CALL SP_UPDATE_MEDICINE('$medicine_id', '$current_medicine', '$new_medicine', '$alias','$stock', '$status')";
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