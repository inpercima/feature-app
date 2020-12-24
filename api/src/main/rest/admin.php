<?php
require_once 'admin.service.php';

$adminService = new AdminService();

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    echo $adminService->listAll();
    break;
  case 'POST':
    echo $adminService->save(json_decode(file_get_contents('php://input')));
    break;
  default:
    break;
}
?>
