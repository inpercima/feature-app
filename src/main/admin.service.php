<?php
require_once 'mysql.connect.php';

class AdminService {

  /**
   * constructor
   */
  public function __construct() {}

  public function listAll() {
    $pdo = connect();

    $stmt = $pdo->query('SELECT * FROM fa_admin WHERE id = 1');
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return json_encode($result[0]);
  }

  public function save($data) {
    $pdo = connect();

    $stmtQuery = $pdo->prepare('SELECT COUNT(*) FROM fa_admin');
    $stmtQuery->execute();
    // $stmt->rowCount() funktioniert nicht auf mysql bzw. ist nicht garantiert
    if ($stmtQuery->fetchColumn() == 0) {
      $columns = 'accountName, featuredTag, dateTag, locations, photographer, tags, startDate';
      $values = ':accountName, :featuredTag, :dateTag, :locations, :photographer, :tags, :startDate';
      $stmt = $pdo->prepare("INSERT INTO fa_admin ({$columns}) VALUES ({$values})");
    } else {
      $shortColumns = 'accountName = :accountName, featuredTag = :featuredTag, dateTag = :dateTag, startDate = :startDate';
      $longColumns = 'locations = :locations, photographer = :photographer, tags = :tags';
      $stmt = $pdo->prepare("UPDATE fa_admin SET {$shortColumns}, {$longColumns}");
    }

    $stmt->bindParam(':accountName', $data->accountName);
    $stmt->bindParam(':featuredTag', $data->featuredTag);
    $stmt->bindParam(':dateTag', $data->dateTag);
    $stmt->bindParam(':locations', $data->locations);
    $stmt->bindParam(':photographer', $data->photographer);
    $stmt->bindParam(':tags', $data->tags);
    $stmt->bindParam(':startDate', $data->startDate);
    return json_encode($stmt->execute());
  }

}
?>
