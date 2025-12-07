<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST"); 
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

session_start();
include_once '../db.php';

$data = json_decode(file_get_contents("php://input"));

if (empty($data->id)) {
    http_response_code(400);
    echo json_encode(array("error" => "ID is required."));
    exit();
}

try {
    $conn->beginTransaction();

    $query = "UPDATE blogs SET title = :title, slug = :slug, content = :content, excerpt = :excerpt, 
              featured_image = :featured_image, status = :status WHERE id = :id";
    
    $stmt = $conn->prepare($query);

    // Prepare values
    // Don't change author on edit usually, or published_at unless status changes (logic can be complex, keeping simple for now)
    $slug = !empty($data->slug) ? $data->slug : strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $data->title)));
    $excerpt = !empty($data->excerpt) ? $data->excerpt : substr(strip_tags($data->content), 0, 150);
    $status = !empty($data->status) ? $data->status : 'draft';
    $featured_image = !empty($data->featured_image) ? $data->featured_image : null;

    $stmt->bindParam(":title", $data->title);
    $stmt->bindParam(":slug", $slug);
    $stmt->bindParam(":content", $data->content);
    $stmt->bindParam(":excerpt", $excerpt);
    $stmt->bindParam(":featured_image", $featured_image);
    $stmt->bindParam(":status", $status);
    $stmt->bindParam(":id", $data->id);

    if ($stmt->execute()) {
        // Update Categories: Delete all existing tags for this blog and re-insert
        $deleteTags = $conn->prepare("DELETE FROM blog_tags WHERE blog_id = :blog_id");
        $deleteTags->bindParam(":blog_id", $data->id);
        $deleteTags->execute();

        if (!empty($data->category_ids) && is_array($data->category_ids)) {
            $tagQuery = "INSERT INTO blog_tags (blog_id, category_id) VALUES (:blog_id, :category_id)";
            $tagStmt = $conn->prepare($tagQuery);
            foreach ($data->category_ids as $cat_id) {
                $tagStmt->bindParam(":blog_id", $data->id);
                $tagStmt->bindParam(":category_id", $cat_id);
                $tagStmt->execute();
            }
        }

        $conn->commit();
        http_response_code(200);
        echo json_encode(array("message" => "Blog updated successfully."));
    } else {
        $conn->rollBack();
        http_response_code(503);
        echo json_encode(array("error" => "Unable to update blog."));
    }
} catch (PDOException $e) {
    $conn->rollBack();
    http_response_code(500);
    echo json_encode(array("error" => "Database error: " . $e->getMessage()));
}
?>
