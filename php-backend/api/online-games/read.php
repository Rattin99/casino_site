<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../db.php';

try {
    $query = "SELECT * FROM online_game ORDER BY id DESC";
    
    $stmt = $conn->prepare($query);
    $stmt->execute();
    
    $games = array();
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $game_item = array(
            "id" => $id,
            "name" => $name,
            "image_url" => $image_url,
            "url" => $url
        );
        array_push($games, $game_item);
    }
    
    echo json_encode($games);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("error" => "Database error: " . $e->getMessage()));
}
?>
