<?php
require_once 'calendar.service.php';

$calendarService = new CalendarService();

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    echo $calendarService->listAll();
    break;
  case 'POST':
    echo $calendarService->save(json_decode(file_get_contents('php://input')));
    break;
  case 'DELETE':
    echo $calendarService->delete(explode('/', trim($_SERVER['PATH_INFO'],'/'))[0]);
    break;
  default:
    break;
}
?>
