<?php
require_once 'post.service.php';

$postsService = new PostsService();

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    echo $postsService->listAll();
    break;
  case 'DELETE':
    echo $postsService->delete();
  case 'POST':
    echo $postsService->save();
    break;
  default:
    break;
}
?>
