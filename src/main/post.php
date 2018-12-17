<?php
require_once 'post.service.php';

$postService = new PostService();

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    $query = $_SERVER['QUERY_STRING'];
    if (strpos($query, 'photographer') !== false) {
      echo $postService->checkPhotographer($query);
    } else {
      echo $postService->listAll();
    }
    break;
  case 'DELETE':
    echo $postService->delete();
    break;
  case 'POST':
    echo $postService->save();
    break;
  default:
    break;
}
?>
