<?php
    $databaseHost = '127.0.0.1';
    $databaseName = 'sekolah';
    $databaseUsername = 'root';
    $databasePassword = 'asari1';
     
    $mysqli = mysqli_connect($databaseHost, $databaseUsername, $databasePassword, $databaseName); 
    if (!$mysqli) {
        die("Koneksi dengan MySQL gagal, Periksa config.php");
    }
?>