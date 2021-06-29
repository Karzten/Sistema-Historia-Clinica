<?php 
    class patient_model
    {
        private $connection;
        function __construct(){
            require_once 'connection.php';
            $this->connection = new Connection();
            $this->connection->connect();
        }

        function ListPatient(){
            $sql = "CALL SP_LIST_PATIENT()";
            $array = array();
            if ($query = $this->connection->connection->query($sql)){
                while ($query_VU = mysqli_fetch_assoc($query)) {
                    $array["data"][]=$query_VU;
                }
                return $array;
                $this->connection->close();
            }
        }

        function RegisterPatient($document, $paternal, $maternal, $name, $gender, $cellphone, $phone, $adress, $date){
            $sql = "CALL SP_REGISTER_PATIENT('$document', '$paternal', '$maternal', '$name', '$gender', '$cellphone', '$phone', '$adress', '$date')";
            $array = array();
            if ($query = $this->connection->connection->query($sql)){
                if ($row = mysqli_fetch_array($query)) {
                    return $id = trim($row[0]);
                }
                $this->connection->close();
            }
        }
    }
?>