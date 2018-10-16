<?php

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$query = "SELECT * FROM logonscript.tbl_tree WHERE tree_parent like 'root'";
$pdo = $db->prepare($query);
$pdo->execute();
$result = $pdo->fetchAll();
$count = 0;
foreach($result as $row){
    $parent = $row['tree_name'];
    $level = $row['tree_level'];

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
        $query = "SELECT * FROM logonscript.tbl_tree WHERE tree_parent LIKE :parent";
        $pdo = $db->prepare($query);
        $pdo->bindParam(":parent",$parent);
        $pdo->execute();
        $result = $pdo->fetchAll();

        foreach($result as $row){
            $parent2 = $row['tree_name'];
            $level = $row['tree_level'];
            $text = $text."->".$parent2;
            echo "|".$text;

            child($parent2,$level,$text);
        }
    }
    else{

    }

}
?>