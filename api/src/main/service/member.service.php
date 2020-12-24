<?php
require_once 'mysql.connect.php';

class MemberService {

  /**
   * constructor
   */
  public function __construct() {}

  public function listAll($query) {
    parse_str($query, $queryArr);
    $pdo = connect();

    $stmt = $pdo->prepare('SELECT * FROM fa_member ORDER BY :sort');
    $stmt->bindParam(':sort', $queryArr['_sort']);
    $stmt->execute();
    return json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
  }

}
?>
