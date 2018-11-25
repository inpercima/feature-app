<?php
require_once 'post.service.php';

$postService = new PostService();

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    echo $postService->listAll();
    break;
  case 'DELETE':
    echo $postService->delete();
  case 'POST':
    echo $postService->save();
    break;
  default:
    break;
}
?>
