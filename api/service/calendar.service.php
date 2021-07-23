<?php
require_once 'mysql.service.php';

class CalendarService {

  /**
   * constructor
   */
  public function __construct() {}

  public function listAll() {
    $mysqlService = new MysqlService();
    return json_encode($mysqlService->select('*', 'calendar'));
  }

  public function save($data) {
    $mysqlService = new MysqlService();
    $stmtQuery = $mysqlService->prepareSelect('COUNT(*)', 'calendar', 'WHERE `date` = :date');
    $stmtQuery->bindParam(':date', $data->date);
    $stmtQuery->execute();

    if ($stmtQuery->fetchColumn() > 0) {
      $stmt = $mysqlService->prepareUpdate('`representativeMember` = :representativeMember WHERE `date` = :date', 'calendar');
    } else {
      $stmt = $mysqlService->prepareInsert('`representativeMember`, `date`', ':representativeMember, :date', 'calendar');
    }
    $stmt->bindParam(':representativeMember', $data->representativeMember);
    $stmt->bindParam(':date', $data->date);
    return json_encode($stmt->execute());
  }

  public function delete($id) {
    $mysqlService = new MysqlService();
    $stmt = $mysqlService->prepareDelete('calendar', 'WHERE id = :id');
    $stmt->bindParam(':id', $id);
    return json_encode($stmt->execute());
  }
}
?>
