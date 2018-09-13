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

    $parent = "root";
    echo "root";
    $tab = "";
    getchild($parent,$tab);


//function

function getchild($parent,$tab){
    $colcount = 0;
    require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
    $tab = $tab."&nbsp&nbsp&nbsp&nbsp&nbsp";

    $bvtreecode = "SELECT * FROM logonscript.tbl_tree
    WHERE treeparent LIKE :parent";

    $pdo2 = $db->prepare($bvtreecode);
    $pdo2->bindParam(":parent",$parent);
    $pdo2->execute();

    $treeresult = $pdo2->fetchAll();
foreach($treeresult as $row){
    $name = $row['treename'];
    echo "|$name:";
    $childcount = colcount($name,$parent,0);
    echo "$childcount";
    getchild($name,$tab);

}

}

function colcount($ccparent,$ccgrandparent,$colcount){
    require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
    $cc = $colcount;

    $ccquery = "SELECT * FROM logonscript.tbl_tree WHERE treeparent LIKE :ccparent";
    //echo "<br>SELECT * FROM logonscript.tbl_tree WHERE treename LIKE $ccparent AND treeparent LIKE $ccgrandparent";
    $ccpdo = $db->prepare($ccquery);
    $ccpdo->bindParam(":ccparent",$ccparent);
    //$ccpdo->bindParam(":ccgrandparent",$ccgrandparent);
    $ccpdo->execute();
    $ccrowcount = $ccpdo->rowCount();
    $ccresult = $ccpdo->fetchAll();

    if($ccrowcount>0){
        foreach($ccresult as $row){
            $ccname = $row['treename'];
            $cc = colcount($ccname,$ccparent,$cc);
        }
    }
    else{
        $cc++;
    }
    return $cc;
}



?>