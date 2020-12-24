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
    $id = substr($_SERVER['REQUEST_URI'], strrpos($_SERVER['REQUEST_URI'], '/') + 1);
    echo $calendarService->delete($id);
    break;
  default:
    break;
}
?>
