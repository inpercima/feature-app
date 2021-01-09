<?php
require_once '../service/core.service.php';
$coreService = new CoreService();

require_once '../service/calendar.service.php';

$coreService->setHeader();

$calendarService = new CalendarService();
switch ($_SERVER['REQUEST_METHOD']) {
  default:
  case 'GET':
    echo $calendarService->listAll();
    break;
  case 'POST':
    echo $calendarService->save(json_decode(file_get_contents('php://input')));
    break;
  case 'DELETE':
    echo $calendarService->delete(substr($_SERVER['PATH_INFO'], 1));
    break;
}
?>
