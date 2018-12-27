<?php
require_once 'note.service.php';

$noteService = new NoteService();

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    echo $noteService->listAll();
    break;
  case 'POST':
    echo $noteService->save(json_decode(file_get_contents('php://input')));
    break;
  default:
    break;
}
?>
