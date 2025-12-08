<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../db.php';

$category = isset($_GET['category']) ? $_GET['category'] : null;
$status = isset($_GET['status']) ? $_GET['status'] : null;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 1000; // Default to high number if not specified

$offset = ($page - 1) * $limit;

try {
    $query = "SELECT * FROM offers WHERE 1=1";
    
    if ($category) {
        $query .= " AND category = :category";
    }
    
    if ($status) {
        $query .= " AND status = :status";
    }
    
    $query .= " ORDER BY created_at DESC LIMIT :limit OFFSET :offset";
    
    $stmt = $conn->prepare($query);
    
    if ($category) {
        $stmt->bindParam(":category", $category);
    }
    
    if ($status) {
        $stmt->bindParam(":status", $status);
    }
    
    $stmt->bindParam(":limit", $limit, PDO::PARAM_INT);
    $stmt->bindParam(":offset", $offset, PDO::PARAM_INT);
    
    $stmt->execute();
    
    $offers = array();
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $offer_item = array(
            "id" => $id,
            "category" => $category,
            "company_name" => $company_name,
            "company_logo" => $company_logo,
            "description" => $description,
            "redirect_url" => $redirect_url,
            "status" => $status,
            "created_at" => $created_at,
            "updated_at" => $updated_at
        );
        array_push($offers, $offer_item);
    }
    
    echo json_encode($offers);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("error" => "Database error: " . $e->getMessage()));
}
?>
