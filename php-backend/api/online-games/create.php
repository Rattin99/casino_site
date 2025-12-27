<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../db.php';

$data = json_decode(file_get_contents("php://input"));

if (
    empty($data->name)
) {
    http_response_code(400);
    echo json_encode(array("error" => "Name is required."));
    exit();
}

try {
    $query = "INSERT INTO online_game (name, image_url, url, country) 
              VALUES (:name, :image_url, :url, :country)";
    
    $stmt = $conn->prepare($query);

    // Default values
    $image_url = !empty($data->image_url) ? $data->image_url : null;
    $url = !empty($data->url) ? $data->url : null;
    $country = !empty($data->country) ? $data->country : null;

    $stmt->bindParam(":name", $data->name);
    $stmt->bindParam(":image_url", $image_url);
    $stmt->bindParam(":url", $url);
    $stmt->bindParam(":country", $country);

    if ($stmt->execute()) {
        $game_id = $conn->lastInsertId();
        http_response_code(201);
        echo json_encode(array("message" => "Online game created successfully.", "id" => $game_id));
    } else {
        http_response_code(503);
        echo json_encode(array("error" => "Unable to create online game."));
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("error" => "Database error: " . $e->getMessage()));
}
?>
