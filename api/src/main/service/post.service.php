<?php
require_once 'mysql.service.php';
require_once 'instagram.service.php';

class PostService {

  /**
   * constructor
   */
  public function __construct() {}

  public function listAll() {
    $mysqlService = new MysqlService();
    return json_encode($mysqlService->select('`photographer`, `date`', 'post', 'ORDER BY `date` DESC'));
  }

  public function checkPhotographer($photographer) {
    $mysqlService = new MysqlService();
    $stmt = $mysqlService->prepareSelect('`photographer`', 'post', 'WHERE `photographer` = :photographer LIMIT 1');
    $stmt->bindParam(':photographer', $photographer);
    $stmt->execute();
    return json_encode($stmt->fetchColumn());
  }

  public function delete() {
    // 'DELETE FROM fa_post WHERE id <= (SELECT MAX(ID)-60 FROM fa_post)'
    // #1093 - Die Verwendung der zu aktualisierenden Zieltabelle 'fa_post' ist in der FROM-Klausel nicht zulässig.
    $mysqlService = new MysqlService();
    $result = $mysqlService->select('MAX(ID) - 60 AS `maxId`', 'post');

    $maxId = $result[0]['maxId'];
    $stmt = $mysqlService->prepareDelete('post', "WHERE `id` <= {$maxId}");
    return json_encode($stmt->execute());
  }

  public function save($posts) {
    $mysqlService = new MysqlService();
    $result = $mysqlService->select('`accountName`', 'admin');

    $accountName = $result[0]['accountName'];
    $instagramService = new InstagramService();

    foreach ($posts as $post) {
      $date = date('Y-m-d', $post->date);
      $result = $$mysqlService->select('COUNT(*)', 'post', "WHERE date = {$date}");

      // $stmt->rowCount() funktioniert nicht auf mysql bzw. ist nicht garantiert
      if ($result[0] == 0) {
        $stmt = $mysqlService->prepareInsert('`date`, `photographer`', ':date, :photographer', 'post');
        $stmt->bindParam(':date', $date);
        $stmt->bindParam(':photographer', $post->photographer);
        $stmt->execute();
      }
    }
    return json_encode(true);
  }
}
?>
