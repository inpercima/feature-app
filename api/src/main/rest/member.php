<?php
require_once '../service/core.service.php';
$coreService = new CoreService();

require_once '../service/member.service.php';

$coreService->setHeader();

$memberService = new MemberService();
switch ($_SERVER['REQUEST_METHOD']) {
  default:
  case 'GET':
    echo $memberService->listAll();
    break;
}
?>
