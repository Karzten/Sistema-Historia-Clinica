<?php 
    class appointment_model
    {
        private $connection;
        function __construct(){
            require_once 'connection.php';
            $this->connection = new Connection();
            $this->connection->connect();
        }

        function ListAppointment(){
            $sql = "CALL SP_LIST_APPOINTMENT()";
            $array = array();
            if ($query = $this->connection->connection->query($sql)){
                while ($query_VU = mysqli_fetch_assoc($query)) {
                    $array["data"][]=$query_VU;
                }
                return $array;
                $this->connection->close();
            }
        }

        function ListComboPatient(){
            $sql = "CALL SP_LIST_COMBO_PATIENT()";
            $array = array();
            if ($query = $this->connection->connection->query($sql)){
                while ($query_VU = mysqli_fetch_array($query)) {
                    $array[]=$query_VU;
                }
                return $array;
                $this->connection->close();
            }
        }

        function RegisterAppointment($patient, $status, $user_id){
            $sql = "CALL SP_REGISTER_APPOINTMENT('$patient','$status', '$user_id')";
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