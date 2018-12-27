<?php

// db credentials
define('DB_HOST', 'mysql');
define('DB_USER', 'root');
define('DB_PASS', 'password');
define('DB_NAME', 'fa_demo');

// connect with the database
function connect() {
  try {
    $pdo = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME.';charset=utf8', DB_USER, DB_PASS);
  } catch (PDOException $e) {
    echo 'Error: ' . $e->getMessage();
    exit();
  }
  return $pdo;
}

?>
