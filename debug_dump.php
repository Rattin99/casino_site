<?php
include_once 'php-backend/api/db.php';

try {
    $stmt = $conn->prepare("SELECT id, company_name, country FROM offers");
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print_r($result);
    
    $stmt2 = $conn->prepare("SELECT id, name, country FROM online_game");
    $stmt2->execute();
    $result2 = $stmt2->fetchAll(PDO::FETCH_ASSOC);
    print_r($result2);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
