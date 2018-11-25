<?php
require_once 'mysql.connect.php';
require_once 'instagram.service.php';

class PostService {

  /**
   * constructor
   */
  public function __construct() {}

  public function listAll() {
    $pdo = connect();

    $stmt = $pdo->query('SELECT photographer, date FROM fa_post ORDER BY date DESC');
    return json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
  }

  public function delete() {
    $pdo = connect();

    // 'DELETE FROM fa_post WHERE id <= (SELECT MAX(ID)-60 FROM fa_post)'
    // #1093 - Die Verwendung der zu aktualisierenden Zieltabelle 'fa_post' ist in der FROM-Klausel nicht zulässig.
    $stmtQuery = $pdo->query('SELECT MAX(ID)-60 FROM fa_post', PDO::FETCH_ASSOC);
    $stmt = $pdo->prepare('DELETE FROM fa_post WHERE id <= :number ');
    $stmt->bindParam(':number', $stmtQuery->fetchColumn());
    return json_encode($stmt->execute());
  }

  public function save() {
    $pdo = connect();

    $stmtQuery = $pdo->query('SELECT accountName FROM fa_admin WHERE id = 1');
    $accountName = $stmtQuery->fetchColumn();

    $instagramService = new InstagramService();
    $posts = json_decode($instagramService->getJson($accountName));

    foreach ($posts as $post) {
      $stmtQuery = $pdo->prepare('SELECT COUNT(*) FROM fa_post WHERE date = :date');
      $date = date('Y-m-d', $post->date);
      $stmtQuery->bindParam(':date', $date);
      $stmtQuery->execute();
      // $stmt->rowCount() funktioniert nicht auf mysql bzw. ist nicht garantiert
      if ($stmtQuery->fetchColumn() == 0) {
        $stmt = $pdo->prepare('INSERT INTO fa_post (date, photographer) VALUES (:date, :photographer)');
        $stmt->bindParam(':date', $date);
        $stmt->bindParam(':photographer', $post->photographer);
        $stmt->execute();
      }
    }
    return json_encode(true);
  }

}
?>
