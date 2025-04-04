<?php

$servername = "localhost";
$username = "root";  
$password = "";      
$database = "ecommerce";

// Connect to MySQL database
$mysqlObj = new mysqli($servername, $username, $password, $database);

// Check connection
if ($mysqlObj->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $mysqlObj->connect_error]));
}
