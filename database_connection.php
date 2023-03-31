<?php
// Connect to MySQL
$host = 'localhost';
$user = 'root';
$password = 'root';
$database = 'todoApp';

$connection = mysqli_connect($host, $user, $password, $database);

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}
// echo "Connected successfully";