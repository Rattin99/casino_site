<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../db.php';

$country = isset($_GET['country']) ? $_GET['country'] : null;

try {
    $query = "SELECT * FROM online_game WHERE 1=1";

    if ($country) {
        $query .= " AND country = :country";
    }

    $query .= " ORDER BY id DESC";
    
    $stmt = $conn->prepare($query);

    if ($country) {
        $stmt->bindParam(":country", $country);
    }

    $stmt->execute();
    
    $games = array();
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $game_item = array(
            "id" => $id,
            "name" => $name,
            "image_url" => $image_url,
            "url" => $url,
            "country" => $country
        );
        array_push($games, $game_item);
    }
    
    echo json_encode($games);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("error" => "Database error: " . $e->getMessage()));
}
?>
