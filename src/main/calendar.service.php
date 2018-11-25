<?php
require_once 'mysql.connect.php';

class CalendarService {

  /**
   * constructor
   */
  public function __construct() {}

  public function listAll() {
    $pdo = connect();

    $stmt = $pdo->query('SELECT * FROM fa_calendar');
    return json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
  }

  public function save($data) {
    $pdo = connect();

    $stmtQuery = $pdo->prepare('SELECT count(*) FROM fa_calendar WHERE date = :date');
    $stmtQuery->bindParam(':date', $data->date);
    $stmtQuery->execute();

    if ($stmtQuery->fetchColumn() > 0) {
      $stmt = $pdo->prepare('UPDATE fa_calendar SET representativeMember = :representativeMember WHERE date = :date');
    } else {
      $stmt = $pdo->prepare('INSERT INTO fa_calendar (representativeMember, date) VALUES (:representativeMember, :date)');
    }
    $stmt->bindParam(':representativeMember', $data->representativeMember);
    $stmt->bindParam(':date', $data->date);
    return json_encode($stmt->execute());
  }

  public function delete($id) {
    $pdo = connect();

    $stmt = $pdo->prepare('DELETE FROM fa_calendar WHERE id = :id');
    $stmt->bindParam(':id', $id);
    return json_encode($stmt->execute());
  }

}
?>
