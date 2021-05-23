<?php 
    class speciality_model
    {
        private $connection;
        function __construct(){
            require_once 'connection.php';
            $this->connection = new Connection();
            $this->connection->connect();
        }

        function ListSpeciality(){
            $sql = "CALL SP_LIST_SPECIALITY()";
            $array = array();
            if ($query = $this->connection->connection->query($sql)){
                while ($query_VU = mysqli_fetch_assoc($query)) {
                    $array["data"][]=$query_VU;
                }
                return $array;
                $this->connection->close();
            }
        }

        function RegisterSpeciality($name, $status){
            $sql = "CALL SP_REGISTER_SPECIALITY('$name','$status')";
            $array = array();
            if ($query = $this->connection->connection->query($sql)) {
                if($row = mysqli_fetch_array($query)){
                    return $id = trim($row[0]);
                }
                $this->connection->close();
            }
        }

        function UpdateSpeciality($speciality_id, $current_speciality, $new_speciality, $status){
            $sql = "CALL SP_UPDATE_SPECIALITY('$speciality_id', '$current_speciality', '$new_speciality','$status')";
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