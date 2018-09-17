<?php
 session_start();
 require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
 {  
      $output = '';  
      $sql = "select user from tbl_log WHERE user LIKE '%".$_POST["query"]."%'";
      $stmt = $db->prepare($sql);
      $row_count = $stmt->rowCount();
     
      $output = '<ul class="list-unstyled">';  
      if($row_count > 0){
        while($row=$stmt->fetch(PDO::FETCH_ASSOC)) {
           {  
                $output .= '<li>'.$row["user"].'</li>';  
           }  
      }  
      else  
      {  
           $output .= '<li>User Not Found</li>';  
      }  
      $output .= '</ul>';  
      echo $output;  
 }  
?>