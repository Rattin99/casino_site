<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../db.php';

$data = json_decode(file_get_contents("php://input"));

if (
    empty($data->category) ||
    empty($data->company_name) ||
    empty($data->redirect_url)
) {
    http_response_code(400);
    echo json_encode(array("error" => "Category, Company Name, and Redirect URL are required."));
    exit();
}

try {
    $query = "INSERT INTO offers (category, company_name, company_logo, description, redirect_url, status) 
              VALUES (:category, :company_name, :company_logo, :description, :redirect_url, :status)";
    
    $stmt = $conn->prepare($query);

    // Default values
    $status = !empty($data->status) ? $data->status : 'active';
    $description = !empty($data->description) ? $data->description : null;
    $company_logo = !empty($data->company_logo) ? $data->company_logo : null;

    $stmt->bindParam(":category", $data->category);
    $stmt->bindParam(":company_name", $data->company_name);
    $stmt->bindParam(":company_logo", $company_logo);
    $stmt->bindParam(":description", $description);
    $stmt->bindParam(":redirect_url", $data->redirect_url);
    $stmt->bindParam(":status", $status);

    if ($stmt->execute()) {
        $offer_id = $conn->lastInsertId();
        http_response_code(201);
        echo json_encode(array("message" => "Offer created successfully.", "id" => $offer_id));
    } else {
        http_response_code(503);
        echo json_encode(array("error" => "Unable to create offer."));
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("error" => "Database error: " . $e->getMessage()));
}
?>
