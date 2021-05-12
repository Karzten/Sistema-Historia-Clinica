<?php 
    class connection{
        private $server;
        private $user;
        private $password;
        private $database;
        public $connection;

        public function __construct(){
            $this->server = "localhost";
            $this->user = "root";
            $this->password = "clinica";
        }

        function connect(){
            $this->connection = new mysqli($this->server,$this->user, $this->password, $this->database);
            $this->connection->set_charset("utf8");
        }

        function close(){
            $this->connection->close();
        }
    }
?>