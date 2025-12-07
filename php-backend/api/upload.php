<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if (isset($_FILES['file'])) {
    $target_dir = "../uploads/";
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true);
    }
    
    $file_name = time() . '_' . basename($_FILES["file"]["name"]);
    $target_file = $target_dir . $file_name;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    
    // Check if image file is a actual image or fake image
    $check = getimagesize($_FILES["file"]["tmp_name"]);
    if($check !== false) {
        if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
            // Return relative path from server root
            echo json_encode(array("url" => "/uploads/" . $file_name));
        } else {
            http_response_code(500);
            echo json_encode(array("error" => "Sorry, there was an error uploading your file."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("error" => "File is not an image."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("error" => "No file uploaded."));
}
?>
