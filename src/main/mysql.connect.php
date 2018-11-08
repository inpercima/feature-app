<?php

// db credentials
define('DB_HOST', 'dbHost');
define('DB_USER', 'dbUser');
define('DB_PASS', 'dbPassword');
define('DB_NAME', 'dbName');

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
