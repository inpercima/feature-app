<?php
require_once 'mysql.service.php';

class MemberService {

  /**
   * constructor
   */
  public function __construct() {}

  public function listAll() {
    $mysqlService = new MysqlService();
    return json_encode($mysqlService->select('*', 'user', "ORDER BY `username` ASC"));
  }
}
?>
