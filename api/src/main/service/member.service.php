<?php
require_once 'mysql.service.php';

class MemberService {

  /**
   * constructor
   */
  public function __construct() {}

  public function listAll() {
    $mysqlService = new MysqlService();
    return json_encode($mysqlService->select('*', 'user', "WHERE `username` NOT IN ('ig_leipzig') ORDER BY `username` ASC"));
  }
}
?>
