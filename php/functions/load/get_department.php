<?php

session_start();
$branch_name=$_GET['branch_name'];


require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
  
    $sql = "select DISTINCT branch_name from tbl_department ORDER BY branch_name ASC";
    $stmt = $db->prepare($sql);
    $stmt->execute();

	while($row=$stmt->fetch(PDO::FETCH_ASSOC)) {
        echo '<option>'.$row['branch_name'].'</option>';
    }            						
?>