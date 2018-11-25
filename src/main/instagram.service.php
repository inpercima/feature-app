<?php
class InstagramService {

  /**
   * constructor
   */
  public function __construct() {}

    /**
   * Checks parameter and return the result json encoded.
   *
   * @param string $username the instagram username
   */
  public function getJson($username) {
    $result = null;
    if (isset($username) && !is_null($username)) {
      $result = $this->listLastPosts($username);
    }
    return json_encode($result);
  }

  /**
   * List the last posts converted from instagram items.
   */
  private function listLastPosts($username) {
    return $this->createPosts($this->listLastItems($username));
  }

  /**
   * Load data from public instagram account.
   *
   * @param string $username the instagram username
   * @return object instagram items
   */
  private function listLastItems($username) {
    $content = file_get_contents('https://www.instagram.com/' . $username);
    $content = explode('window._sharedData = ', $content)[1];
    $content = explode(';</script>', $content)[0];
    $data = json_decode($content);
    return $data->entry_data->ProfilePage[0]->graphql->user->edge_owner_to_timeline_media->edges;
  }

    /**
   * Convert an instagram item with some data into a post.
   *
   * @param object $item the instagram item
   * @return array created post
   */
  private function createPost($item) {
    $extractions = $this->extractItems($item->edge_media_to_caption->edges[0]->node->text);
    return !empty($extractions) ? array(
      'id' => $item->id,
      'picture' => $item->display_url,
      'likes' => $item->edge_liked_by->count,
      'date' => $item->taken_at_timestamp,
      'selected' => $extractions['selected'],
      'photo' => $extractions['photo']
    ) : null;
  }

  function createPosts($items) {
    $posts = array();
    foreach ($items as $item) {
      $post = $this->createPost($item->node);
      if (!empty($post)) {
        array_push($posts, $post);
      }
    }
    return $posts;
  }

  private function extractItems($text) {
    preg_match('/P H O T O\s+\|\s+@(.+)/', $text, $result);
    $photo = $result[1];
    preg_match('/S E L E C T E D\s+\|\s+@(.+)/', $text, $result);
    $selected = $result[1];
    return !empty($result) ? array(
      'selected' => $selected,
      'photo' => $photo
    ) : $result;
  }

}
?>
