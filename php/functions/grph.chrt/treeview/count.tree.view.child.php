<?php
$bld = $_POST["branch"];

//require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/connection.php";

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$stmt = $db->prepare("SELECT * FROM logonscript.tbl_tree WHERE treeparent='?' ORDER BY treename");
$stmt->execute(array($bld));

$count = 0;

while  ($output = $stmt->fetch()){
    $treename = $row['treename'];

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

/*
$query = mysqli_query($con,"select * from sky.tbl_treeview where treeparent='$bld' ORDER BY treename");

$count = 0;
//print content
while ($row = mysqli_fetch_array($query)){
    $treename = $row['treename'];

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

mysqli_close($con);
*/

?>