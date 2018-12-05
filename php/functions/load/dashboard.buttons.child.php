<?php

$bld = $_POST['parentid'];
$count = 0;

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$query1 = "SELECT * FROM logonscript.tbl_tree WHERE tree_id = $bld group by tree_name";
foreach ($db->query($query1) as $row){
    $treeparent = $row['tree_name'];
}
$query = "SELECT *
            FROM logonscript.tbl_tree
            WHERE tree_parent like :bld
            ORDER BY tree_name";

$stmt = $db->prepare($query);
$stmt->bindParam(":bld",$treeparent);
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
  echo "false";
}

$stmt = null;
$db = null;
?>
