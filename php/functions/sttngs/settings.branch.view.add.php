<?php

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$query = "SELECT * FROM logonscript.tbl_tree WHERE treeparent like 'root'";
$pdo = $db->prepare($query);
$pdo->execute();
$result = $pdo->fetchAll();
$count = 0;
foreach($result as $row){
    $parent = $row['treename'];
    $level = $row['treelevel'];

    if ($count != 0){
        echo "|";
    }
    else{
        //do nothing
    }

    echo $parent;
    $count++;
    child($parent,$level,$parent);
}

function child($parent,$child,$text){

    if($child < 3){
        require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
        $query = "SELECT * FROM logonscript.tbl_tree WHERE treeparent LIKE :parent";
        $pdo = $db->prepare($query);
        $pdo->bindParam(":parent",$parent);
        $pdo->execute();
        $result = $pdo->fetchAll();

        foreach($result as $row){
            $parent2 = $row['treename'];
            $level = $row['treelevel'];
            $text = $text."->".$parent2;
            echo "|".$text;

            child($parent2,$level,$text);
        }
    }
    else{

    }

}
?>