<?php
//$reporttype = $_POST["reporttype"];
$reporttype = "computerlist";

if($reporttype == "computerlist"){
  $display = "Computer List";
  $dataparent = "#DHSBRDRecords";
}
else{
  $display = "";
}

session_start();
$role = $_SESSION["role"];

if($role == "ADMINISTRATOR" || $role == "SUPER ADMIN"){
  $origin = "root";
  $onclick="";
  treelist($origin, $display, 0, $dataparent);
}
else if($role == "STAFF"){
  $origin = $_SESSION["department"];

}
else{

}

function treelist($origin, $display, $queue, $dataparent){
  require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
  //Count the number of sub-department of the current origin;
  $query = "SELECT COUNT(*) FROM logonscript.tbl_tree WHERE tree_parent = \"$origin\"";
    foreach($db->query($query) as $row){
      $count = $row["COUNT(*)"];
  }
  $onclick = "";
  if($queue != 0){
    $onclick = "onClick=DSHBRDCompList(\"$queue\")";
  }

  //Compare the number of sub-department of the current $origin;
  //if none, minimal link will be used;

  if($count != 0){
    echo "<a class='nav-link nav-link-collapse collapsed' data-toggle='collapse' $onclick href='#complist-$queue' data-parent='$dataparent' aria-extended='false'>$display</a>";

    //geting sub-department
    $query = "SELECT tree_name, tree_id FROM logonscript.tbl_tree WHERE  tree_parent = \"$origin\" ORDER BY tree_name ASC";

    echo "<ul class='sidenav-third-level collapse' id='complist-$queue' data-parent='$dataparent'>";

    $dataparent = "#complist-$queue";
    foreach($db->query($query) as $row){
      echo "<li class=\"nav-item\">";
      $origin = $row["tree_name"];
      $display = $row["tree_name"];
      $queue = $row["tree_id"];
      treelist($origin, $display, $queue, $dataparent);
      echo "</li>";
    }//end of foreach
    echo "</ul>";

  }
  else{
    echo "<a $onclick>$display</a>";

  }
$db = null;
}//end of treelist funtion

 ?>
