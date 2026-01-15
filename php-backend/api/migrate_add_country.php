<?php
include_once 'db.php';

function addColumnIfNotExists($conn, $table, $column, $definition) {
    try {
        $check = $conn->query("SHOW COLUMNS FROM $table LIKE '$column'");
        if ($check->rowCount() == 0) {
            $sql = "ALTER TABLE $table ADD COLUMN $column $definition";
            $conn->exec($sql);
            echo "Column '$column' added to table '$table'.\n";
        } else {
            echo "Column '$column' already exists in table '$table'.\n";
        }
    } catch (PDOException $e) {
        echo "Error modifying table '$table': " . $e->getMessage() . "\n";
    }
}

echo "Starting migration...\n";
addColumnIfNotExists($conn, 'offers', 'country', 'VARCHAR(255) DEFAULT NULL');
addColumnIfNotExists($conn, 'online_game', 'country', 'VARCHAR(255) DEFAULT NULL');
echo "Migration completed.\n";
?>
