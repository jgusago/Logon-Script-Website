<?php
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/connection.php";

$bld = $_POST["branch"];

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
?>