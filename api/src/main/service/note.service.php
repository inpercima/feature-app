<?php
require_once 'mysql.service.php';

class NoteService {

  /**
   * constructor
   */
  public function __construct() {}

  public function listAll() {
    $mysqlService = new MysqlService();
    return json_encode($mysqlService->select('*', 'note', 'ORDER BY `date` DESC'));
  }

  public function save($data) {
    $mysqlService = new MysqlService();
    $stmt = $mysqlService->prepareInsert('`member`, `date`, `title`, `text`', ':member, :date, :title, :text', 'note');
    $stmt->bindParam(':member', $data->member);
    $stmt->bindParam(':date', $data->date);
    $stmt->bindParam(':title', $data->title);
    $stmt->bindParam(':text', $data->text);
    return json_encode($stmt->execute());
  }
}
?>
