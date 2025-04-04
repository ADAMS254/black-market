<?php
    require_once 'db.php';

    $statement ="SELECT * FROM products";
    $result = $mysqlObj->query($statement);

    $products = [];
   
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
    } else {
        echo json_encode([]);
    }

    echo json_encode($products);
?>