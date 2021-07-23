<?php
require_once '../service/core.service.php';
$coreService = new CoreService();

require_once '../service/admin.service.php';

$coreService->setHeader();

$adminService = new AdminService();
switch ($_SERVER['REQUEST_METHOD']) {
  default:
  case 'GET':
    echo $adminService->listAll();
    break;
  case 'POST':
    echo $adminService->save(json_decode(file_get_contents('php://input')));
    break;
}
?>
