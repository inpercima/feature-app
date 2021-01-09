<?php
require_once 'mysql.service.php';

class AdminService {

  /**
   * constructor
   */
  public function __construct() {}

  public function listAll() {
    $mysqlService = new MysqlService();
    $result = $mysqlService->select('*', 'admin');
    return json_encode($result[0]);
  }

  public function save($data) {
    $mysqlService = new MysqlService();

    $stmtQuery = $mysqlService->prepareSelect('COUNT(*)', 'admin');
    $stmtQuery->execute();
    // $stmt->rowCount() funktioniert nicht auf mysql bzw. ist nicht garantiert
    if ($stmtQuery->fetchColumn() == 0) {
      $columns = 'accountName, featuredTag, dateTag, locations, photographer, tags, startDate';
      $values = ':accountName, :featuredTag, :dateTag, :locations, :photographer, :tags, :startDate';
      $stmt = $mysqlService->prepareInsert($columns, $values, 'admin');
    } else {
      $shortColumns = 'accountName = :accountName, featuredTag = :featuredTag, dateTag = :dateTag, startDate = :startDate';
      $longColumns = 'locations = :locations, photographer = :photographer, tags = :tags';
      $stmt = $mysqlService->prepareUpdate("{$shortColumns}, {$longColumns}", 'admin');
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
