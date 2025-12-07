<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

session_start();

include_once 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->username) && !empty($data->password)) {
    // Trim whitespace from username to prevent errors with accidental spaces
    $username = trim($data->username);
    
    $query = "SELECT id, username, password FROM admins WHERE username = :username LIMIT 0,1";
    $stmt = $conn->prepare($query);

    $stmt->bindParam(":username", $username);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Check password:
        // 1. Direct comparison (for the plain text password currently in your DB)
        // 2. password_verify (for security, if you decide to hash passwords later)
        if ($data->password === $row['password'] || password_verify($data->password, $row['password'])) {
            
            $_SESSION['admin_id'] = $row['id'];
            $_SESSION['admin_username'] = $row['username'];

            http_response_code(200);
            echo json_encode(array("message" => "Login successful."));
        } else {
            http_response_code(401);
            echo json_encode(array("error" => "Invalid credentials."));
        }
    } else {
        http_response_code(401);
        echo json_encode(array("error" => "Invalid credentials."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("error" => "Incomplete data."));
}
?>