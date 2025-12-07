<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../db.php';

$id = isset($_GET['id']) ? $_GET['id'] : null;
$status = isset($_GET['status']) ? $_GET['status'] : null;

if ($id) {
    $query = "SELECT b.*, a.username as author_name, GROUP_CONCAT(c.id) as category_ids, GROUP_CONCAT(c.name) as category_names 
              FROM blogs b 
              LEFT JOIN admins a ON b.author_id = a.id 
              LEFT JOIN blog_tags bt ON b.id = bt.blog_id 
              LEFT JOIN blog_categories c ON bt.category_id = c.id 
              WHERE b.id = :id
              GROUP BY b.id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":id", $id);
} else {
    $query = "SELECT b.*, a.username as author_name, GROUP_CONCAT(c.name) as category_names 
              FROM blogs b 
              LEFT JOIN admins a ON b.author_id = a.id 
              LEFT JOIN blog_tags bt ON b.id = bt.blog_id 
              LEFT JOIN blog_categories c ON bt.category_id = c.id ";
    
    if ($status) {
        $query .= "WHERE b.status = :status ";
    }
    
    $query .= "GROUP BY b.id ORDER BY b.created_at DESC";
    
    $stmt = $conn->prepare($query);
    
    if ($status) {
        $stmt->bindParam(":status", $status);
    }
}

$stmt->execute();
$blogs = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($blogs);
?>