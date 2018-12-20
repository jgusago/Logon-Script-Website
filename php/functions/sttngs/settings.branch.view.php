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
    getchild($parent);


//function

function getchild($parent){
    $colcount = 0;
    require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

    $bvtreecode = "SELECT * FROM logonscript.tbl_tree
    WHERE tree_parent LIKE :parent";

    $pdo2 = $db->prepare($bvtreecode);
    $pdo2->bindParam(":parent",$parent);
    $pdo2->execute();
    $countroom = 0;
    $treeresult = $pdo2->fetchAll();
foreach($treeresult as $row){
    $name = $row['tree_name'];
    $number = $row['tree_level'];
    $id = $row['tree_id'];
    $filter = $row['tree_filter'];
    $childcount = colcount($name,0);
    $trtd = colbreaker($parent,$name,0);
    if($parent == "root" && $countroom == 0){
        //do nothing
    }
    else{
        echo "||";
    }
    echo "$name;$childcount;$trtd;$number;$id;$filter";
    getchild($name);
    $countroom++;
}

}

function colcount($ccparent,$colcount){
    require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
    $cc = $colcount;

    $ccquery = "SELECT * FROM logonscript.tbl_tree WHERE tree_parent LIKE :ccparent";
    $ccpdo = $db->prepare($ccquery);
    $ccpdo->bindParam(":ccparent",$ccparent);
    $ccpdo->execute();
    $ccrowcount = $ccpdo->rowCount();
    $ccresult = $ccpdo->fetchAll();

    if($ccrowcount>0){
        foreach($ccresult as $row){
            $ccname = $row['tree_name'];
            $cc = colcount($ccname,$cc);
        }
    }
    else{
        $cc++;
    }
    return $cc;
}

function colbreaker($parent,$name){
    require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
    $brkquery = "SELECT * FROM logonscript.tbl_tree WHERE tree_parent LIKE :brkparent";
    $brkpdo = $db->prepare($brkquery);
    $brkpdo->bindParam(":brkparent",$parent);
    $brkpdo->execute();
    $brkcount = $brkpdo->rowCount();
    $brkresult = $brkpdo->fetchAll();
    $count = 0;
    $countII = 0;
    foreach($brkresult as $row){
        $brkcurrentrow[$count] = $row['tree_name'];
        $count++;
    }

    for($countII=0;$brkcurrentrow[$countII] != $name; $countII++){
    $countII;
    }

    if($countII > 0 || $parent == 'root'){
        return "tr";
    }
    else{
        return "td";
    }
}




?>
