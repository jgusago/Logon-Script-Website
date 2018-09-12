<?php

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$dbmgr = "SELECT *
            FROM logonscript.tbl_col_manager
            WHERE dbname LIKE 'tbl_tree'";

$pdo = $db->prepare($dbmgr);
$pdo->execute();
$result = $pdo->fetchAll();
$arrcount = 0;

foreach($result as $row){
    $tree[$arrcount] = $row[$arrcount];     

}

$bvtree = "SELECT * FROM tbl_tree
            WHERE treeparent like 'root'";

    $pdo2 = $db->prepare($bvtree);
    $pdo2->execute();
    $treeresult = $pdo2->fetchAll();
foreach($treeresult as $row){
    $name = $row['treename'];

    echo "$name<br>";
    $tab = "&nbsp";
    getchild($name,$tab);

}

//function

function getchild($parent,$tab){
    require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
    $tab = $tab."&nbsp";

    $bvtreecode = "SELECT * FROM logonscript.tbl_tree
    WHERE treeparent LIKE :parent";

    $pdo2 = $db->prepare($bvtreecode);
    $pdo2->bindParam(":parent",$parent);
    $pdo2->execute();
    $treeresult = $pdo2->fetchAll();
foreach($treeresult as $row){
    $name = $row['treename'];

    echo "$name<br>";
    $tab = "&nbsp";
    getchild($name,$tab);

}   

}

?>