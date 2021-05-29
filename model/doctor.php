<?php 
    class doctor_model
    {
        private $connection;
        function __construct(){
            require_once 'connection.php';
            $this->connection = new Connection();
            $this->connection->connect();
        }

        function ListDoctor(){
            $sql = "CALL SP_LIST_DOCTOR()";
            $array = array();
            if ($query = $this->connection->connection->query($sql)){
                while ($query_VU = mysqli_fetch_assoc($query)) {
                    $array["data"][]=$query_VU;
                }
                return $array;
                $this->connection->close();
            }
        }

        function ListComboSpeciality(){
            $sql = "CALL SP_LIST_COMBO_SPECIALITY()";
            $array = array();
            if ($query = $this->connection->connection->query($sql)){
                while ($query_VU = mysqli_fetch_array($query)) {
                    $array[]=$query_VU;
                }
                return $array;
                $this->connection->close();
            }
        }

        function RegisterDoctor($document, $tuiton, $paternal, $maternal, $name, $cellphone, $phone, $adress, $date, $speciality, $username, $password, $gender, $role, $email){
            $sql = "CALL SP_REGISTER_DOCTOR('$document', '$tuiton', '$paternal', '$maternal', '$name', '$cellphone', '$phone', '$adress', '$date', '$speciality', '$username', '$password', '$gender', '$role', '$email')";
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