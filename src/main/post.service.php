<?php
require_once 'mysql.connect.php';
require_once 'instagram.service.php';

class PostsService {

  /**
   * constructor
   */
  public function __construct() {}

  public function listAll() {
    $pdo = connect();

    $stmt = $pdo->query('SELECT photoby, date FROM fa_post ORDER BY date DESC');
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
    $instagramService = new InstagramService();
    $posts = json_decode($instagramService->getJson('ig_leipzig'));
    $pdo = connect();

    foreach ($posts as $post) {
      $stmt = $pdo->prepare('SELECT COUNT(*) FROM fa_post WHERE date = :date');
      $date = date('Y-m-d', $post->date);
      $stmt->bindParam(':date', $date);
      $stmt->execute();
      // $stmt->rowCount() funktioniert nicht auf mysql bzw. ist nicht garantiert
      if ($stmt->fetchColumn() == 0) {
        $stmt = $pdo->prepare('INSERT INTO fa_post (date, photoby) VALUES (:date, :photoby)');
        $stmt->bindParam(':date', $date);
        $stmt->bindParam(':photoby', $post->photo);
        $stmt->execute();
      }
    }
    return json_encode(true);
  }

}
?>
