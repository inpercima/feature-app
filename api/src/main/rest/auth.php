<?php
require_once '../service/core.service.php';
$coreService = new CoreService();

require_once '../service/auth.service.php';

$coreService->setHeader();

$authService = new AuthService();
switch ($_SERVER['REQUEST_METHOD']) {
  case 'POST':
    $input = json_decode(file_get_contents('php://input'));
    echo $authService->authenticate($input->username, $input->password);
    break;
  default:
    break;
}
?>
