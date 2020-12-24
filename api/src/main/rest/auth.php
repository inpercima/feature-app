<?php
require_once 'auth.service.php';

$authService = new AuthService();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type");

switch ($_SERVER['REQUEST_METHOD']) {
  case 'POST':
    echo $authService->authenticate();
    break;
  default:
    break;
}
?>
