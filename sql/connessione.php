<?php
try{
$conn = new MySQLi("localhost", "user", "CiaoAlex2006", "dbSito");
}catch(Exception $e){
    die("Connessione fallita: " . $e->getMessage());
}
?>