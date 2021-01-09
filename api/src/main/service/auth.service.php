<?php
require_once 'mysql.service.php';

class AuthService {

  /**
   * constructor
   */
  public function __construct() {}

  /**
   * Authenticate.
   */
  public function authenticate($username, $password) {
    $result = '';
    if ($this->findUserByEMail($username, $password)) {
      header('Access-Control-Expose-Headers: Authorization');
      header('Authorization: Bearer ' . $this->generateToken($username));
    } else {
      $result = array('message' => 'Username or password is incorrect.');
      http_response_code(401);
    }
    return json_encode($result);
  }

  function findUserByEMail($username, $password) {
    $mysqlService = new MysqlService();
    $stmt = $mysqlService->prepareSelect('`password`', 'user', 'WHERE `username` = :username');
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    $hash = $stmt->fetchColumn();

    return password_verify($password, $hash);
  }

  /**
   * Generate a simple jwt to authenticate.
   *
   * @param string $username
   */
  function generateToken($username) {
    $header = $this->base64url_encode(json_encode(array('alg' => 'HS256', 'typ' => 'JWT')));
    $iat = time();
    $nbf = $iat + 10;
    $exp = $nbf + 7200;
    $payload = $this->base64url_encode(json_encode(array('username' => $username, 'exp' => $exp, 'nbf' => $nbf, 'iat' => $iat)));
    $signature = $this->base64url_encode(hash_hmac('sha256', "$header.$payload", 'featureApp', true));
    return "$header.$payload.$signature";
  }

  /**
   * Helper function to base64Url encode.
   *
   * @param string $data
   */
  function base64url_encode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
  }
}
?>
