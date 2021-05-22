<?php 
    class supply_model
    {
        private $connection;
        function __construct(){
            require_once 'connection.php';
            $this->connection = new Connection();
            $this->connection->connect();
        }

        function ListSupply(){
            $sql = "CALL SP_LIST_SUPPLY()";
            $array = array();
            if ($query = $this->connection->connection->query($sql)){
                while ($query_VU = mysqli_fetch_assoc($query)) {
                    $array["data"][]=$query_VU;
                }
                return $array;
                $this->connection->close();
            }
        }

        function RegisterSupply($name, $stock, $status){
            $sql = "CALL SP_REGISTER_SUPPLY('$name', '$stock', '$status')";
            $array = array();
            if ($query = $this->connection->connection->query($sql)) {
                if($row = mysqli_fetch_array($query)){
                    return $id = trim($row[0]);
                }
                $this->connection->close();
            }
        }

        function UpdateSupply($supply_id, $current_supply, $new_supply, $stock, $status){
            $sql = "CALL SP_UPDATE_SUPPLY('$supply_id', '$current_supply', '$new_supply', '$stock','$status')";
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