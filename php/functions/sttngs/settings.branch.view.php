<?php

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/connection.php";

echo "1|2|3|4"

$query = mysqli_query($con,"SELECT * FROM logonscript.tbl_tree");

while($row = mysqli_fetch_array($query)){

    $tree = $row['treename'];
    $tree_parent = $row['treeparent'];
    $tree_filter = $row['treefilter'];

    echo "#$tree|$tree_parent|$tree_filter";

}

mysqli_close($con);

?>