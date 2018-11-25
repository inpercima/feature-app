<?php
require_once 'member.service.php';

$memberService = new MemberService();

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    echo $memberService->listAll($_SERVER['QUERY_STRING']);
    break;
  default:
    break;
}
?>
