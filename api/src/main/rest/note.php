<?php
require_once '../service/core.service.php';
$coreService = new CoreService();

require_once '../service/note.service.php';

$coreService->setHeader();

$noteService = new NoteService();
switch ($_SERVER['REQUEST_METHOD']) {
  default:
  case 'GET':
    echo $noteService->listAll();
    break;
  case 'POST':
    echo $noteService->save(json_decode(file_get_contents('php://input')));
    break;
}
?>
