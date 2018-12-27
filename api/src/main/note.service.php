<?php
require_once 'mysql.connect.php';

class NoteService {

  /**
   * constructor
   */
  public function __construct() {}

  public function listAll() {
    $pdo = connect();

    $stmt = $pdo->query('SELECT * FROM fa_note ORDER BY date DESC');
    return json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
  }

  public function save($data) {
    $pdo = connect();

    $stmt = $pdo->prepare('INSERT INTO fa_note (member, date, title, text) VALUES (:member, :date, :title, :text)');
    $stmt->bindParam(':member', $data->member);
    $stmt->bindParam(':date', $data->date);
    $stmt->bindParam(':title', $data->title);
    $stmt->bindParam(':text', $data->text);
    return json_encode($stmt->execute());
  }

}
?>
