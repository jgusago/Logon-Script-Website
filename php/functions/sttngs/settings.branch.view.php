<?php

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$dbmgr = "SELECT *
            FROM logonscript.tbl_col_manager
            WHERE db_name LIKE :dbname
            AND column_name NOT LIKE :id";

$pdo = $db->prepare($dbmgr);
$pdo->bindParam(":db_name","tbl_tree");
$pdo->bindParam(":id","%id%");
$pdo->execute();
$result = $pdo->fetchAll();
$arrcount = 0;

foreach($result as $row){
    $tree[$arrcount] = $row[$arrcount];     

}

$bvtree = "SELECT * FROM tbl_tree
            WHERE treeparent = :parent";

$pdo2 = $db->prepare($bvtree);
$pdo2->bindParam(":parent","root");
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

    $tab = $tab."&nbsp";

    $bvtree = "SELECT * FROM tbl_tree
    WHERE treeparent = :parent";

    $pdo2 = $db->prepare($bvtree);
    $pdo2->bindParam(":parent","root");
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