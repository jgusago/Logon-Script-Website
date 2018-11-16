<?php
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$sql2 = "SELECT * FROM logonscript.tbl_tree where tree_level = 1";
      
        $count = 0;
		foreach ($db->query($sql2) as $row) {
            if ($count !== 0){
                echo "|";
            }
            echo $tree_name = $row['tree_name'];

            $count++;
        }    

?>