<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

session_start();

if (isset($_SESSION['admin_id'])) {
    http_response_code(200);
    echo json_encode(array("authenticated" => true, "username" => $_SESSION['admin_username']));
} else {
    http_response_code(401); // Unauthorized
    echo json_encode(array("authenticated" => false));
}
?>
