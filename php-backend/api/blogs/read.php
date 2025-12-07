<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../db.php';

$id = isset($_GET['id']) ? $_GET['id'] : null;
$slug = isset($_GET['slug']) ? $_GET['slug'] : null;
$status = isset($_GET['status']) ? $_GET['status'] : null;

$query = "SELECT b.*, a.username as author_name, GROUP_CONCAT(c.id) as category_ids, GROUP_CONCAT(c.name) as category_names 
          FROM blogs b 
          LEFT JOIN admins a ON b.author_id = a.id 
          LEFT JOIN blog_tags bt ON b.id = bt.blog_id 
          LEFT JOIN blog_categories c ON bt.category_id = c.id ";

$conditions = [];
$params = [];

if ($id) {
    $conditions[] = "b.id = :id";
    $params[":id"] = $id;
} elseif ($slug) {
    $conditions[] = "b.slug = :slug";
    $params[":slug"] = $slug;
}

// Only allow published blogs for public view, or all for admin if no status is specified
if ($status) {
    $conditions[] = "b.status = :status";
    $params[":status"] = $status;
}

if (!empty($conditions)) {
    $query .= "WHERE " . implode(" AND ", $conditions) . " ";
}

$query .= "GROUP BY b.id ";

// Order by created_at DESC only if no specific blog is requested by ID or slug
if (!$id && !$slug) {
    $query .= "ORDER BY b.created_at DESC";
}

$stmt = $conn->prepare($query);
$stmt->execute($params);

$blogs = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($blogs);
?>
