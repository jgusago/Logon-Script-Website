<?php

error_reporting(0);

session_start();
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
  
    //$branch_name = $_GET['branch_name'];
    $sql = "select sub_department from tbl_department WHERE branch_name='B2B'";
    $stmt = $db->prepare($sql);
    $stmt->execute();

	while($row=$stmt->fetch(PDO::FETCH_ASSOC)) {
        echo '<option>'.$row['sub_department'].'</option>'; 
    }            						
?>