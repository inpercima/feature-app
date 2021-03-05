<?php
require_once '../service/core.service.php';
$coreService = new CoreService();

require_once '../service/post.service.php';

$coreService->setHeader();

$postService = new PostService();
switch ($_SERVER['REQUEST_METHOD']) {
  default:
  case 'GET':
    if (isset($_SERVER['PATH_INFO'])) {
      $photographer = substr($_SERVER['PATH_INFO'], 1);
      echo $postService->checkPhotographer($photographer);
    } else {
      echo $postService->listAll();
    }
    break;
  case 'DELETE':
    echo $postService->delete();
    break;
  case 'POST':
    $input = file_get_contents('php://input');
    if (isset($_SERVER['PATH_INFO'])) {
      echo $postService->saveOne($input);
    } else {
      echo $postService->save(json_decode($input));
    }
    break;
}
?>
