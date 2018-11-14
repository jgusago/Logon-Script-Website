<?php
$count = 0;

session_start();

if($_SESSION['department'] !== "STAFF"){
    $bld = $_POST["branch"];
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

    if($count>0)
    {
        $output = $output.'|'.$treename;
    }
    else{
    $output = $treename;
    }
    $count++;

}

if ($count>0){
    echo $output;
}
else{
    echo $count;
}

$stmt = null;
$db = null;

?>
