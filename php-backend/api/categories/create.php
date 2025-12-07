<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../db.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->name)) {
    $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $data->name)));
    
    $query = "INSERT INTO blog_categories (name, slug) VALUES (:name, :slug)";
    $stmt = $conn->prepare($query);
    
    $stmt->bindParam(":name", $data->name);
    $stmt->bindParam(":slug", $slug);

    try {
        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(array("message" => "Category created.", "id" => $conn->lastInsertId(), "name" => $data->name));
        } else {
            http_response_code(503);
            echo json_encode(array("error" => "Unable to create category."));
        }
    } catch (PDOException $e) {
         http_response_code(400);
         echo json_encode(array("error" => "Category likely exists."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("error" => "Name is required."));
}
?>
