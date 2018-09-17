<?php
 session_start();
 require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
 if(isset($_POST["query"]))   
 {  
      $output = '';  
      $stmt = $pdo->query("select user from tbl_log WHERE user LIKE '%".$_POST["query"]."%'");
      $row_count = $stmt->rowCount();
     
      $output = '<ul class="list-unstyled">';  
      if($row_count > 0){
        while ($row = $stmt->fetch()) {
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