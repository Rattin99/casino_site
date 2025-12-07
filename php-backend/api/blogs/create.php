<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

session_start();
include_once '../db.php';

$data = json_decode(file_get_contents("php://input"));

// Basic validation
if (empty($data->title) || empty($data->content)) {
    http_response_code(400);
    echo json_encode(array("error" => "Title and Content are required."));
    exit();
}

// Generate slug if not provided
if (empty($data->slug)) {
    // Simple slug generation
    $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $data->title)));
} else {
    $slug = $data->slug;
}

// Check if slug exists
$checkSlug = $conn->prepare("SELECT id FROM blogs WHERE slug = :slug");
$checkSlug->bindParam(":slug", $slug);
$checkSlug->execute();
if ($checkSlug->rowCount() > 0) {
    // Append timestamp to make unique
    $slug = $slug . "-" . time();
}

try {
    $conn->beginTransaction();

    $query = "INSERT INTO blogs (title, slug, content, excerpt, featured_image, author_id, status, published_at) 
              VALUES (:title, :slug, :content, :excerpt, :featured_image, :author_id, :status, :published_at)";
    
    $stmt = $conn->prepare($query);

    // Default values
    $author_id = isset($_SESSION['admin_id']) ? $_SESSION['admin_id'] : (isset($data->author_id) ? $data->author_id : 1); // Fallback to 1 if no session (dev)
    $status = !empty($data->status) ? $data->status : 'draft';
    $published_at = ($status === 'published') ? date('Y-m-d H:i:s') : null;
    $excerpt = !empty($data->excerpt) ? $data->excerpt : substr(strip_tags($data->content), 0, 150);
    $featured_image = !empty($data->featured_image) ? $data->featured_image : null;

    $stmt->bindParam(":title", $data->title);
    $stmt->bindParam(":slug", $slug);
    $stmt->bindParam(":content", $data->content);
    $stmt->bindParam(":excerpt", $excerpt);
    $stmt->bindParam(":featured_image", $featured_image);
    $stmt->bindParam(":author_id", $author_id);
    $stmt->bindParam(":status", $status);
    $stmt->bindParam(":published_at", $published_at);

    if ($stmt->execute()) {
        $blog_id = $conn->lastInsertId();

        // Handle Categories (Tags)
        if (!empty($data->category_ids) && is_array($data->category_ids)) {
            $tagQuery = "INSERT INTO blog_tags (blog_id, category_id) VALUES (:blog_id, :category_id)";
            $tagStmt = $conn->prepare($tagQuery);
            foreach ($data->category_ids as $cat_id) {
                $tagStmt->bindParam(":blog_id", $blog_id);
                $tagStmt->bindParam(":category_id", $cat_id);
                $tagStmt->execute();
            }
        }

        $conn->commit();
        http_response_code(201);
        echo json_encode(array("message" => "Blog created successfully.", "id" => $blog_id));
    } else {
        $conn->rollBack();
        http_response_code(503);
        echo json_encode(array("error" => "Unable to create blog."));
    }
} catch (PDOException $e) {
    $conn->rollBack();
    http_response_code(500);
    echo json_encode(array("error" => "Database error: " . $e->getMessage()));
}
?>
