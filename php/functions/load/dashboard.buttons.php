<?php
$count = 0;

session_start();

if($_SESSION['role'] == "ADMINISTRATOR" or $_SESSION['role'] == "SUPER ADMIN"){
    $bld = "root";
}
else{
    $bld = $_SESSION['department'];
}
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
$query = "SELECT *
            FROM logonscript.tbl_tree
            WHERE tree_parent LIKE :bld
            ORDER BY tree_name";

$stmt = $db->prepare($query);
$stmt->bindParam(":bld",$bld);
$stmt->execute();
$result = $stmt->fetchAll();

foreach($result as $row){

    $treename = $row['tree_name'];
    $treeid = $row['tree_id'];

    if($count>0)
    {
        $output = $output.'|'.$treename."`".$treeid;
    }
    else{
    $output = $treename."`".$treeid;
    }
    $count++;

}

if ($count>0){
    echo "$output";
}
else{
  echo $bld;
}


$stmt = null;
$db = null;

?>
