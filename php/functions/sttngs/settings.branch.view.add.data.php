<?php
$parent = $_POST['parent'];
$childname = $_POST['childname'];
$condition = $_POST['condition'];

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
$arr = explode("->",$parent);
$count = count($arr);
$newtreelevel = $count+1;

$checkq = "SELECT * FROM logonscript.tbl_tree WHERE treename LIKE :tn";
$checkpdo = $db->prepare($checkq);
$checkpdo->bindParam(":tn",$childname);
$checkpdo->execute();
$rowcount = $checkpdo->rowCount();

if ($rowcount == 0){

$query = "INSERT INTO logonscript.tbl_tree (treename, treelevel, treeparent, treefilter) VALUES ( :tn, :tl, :tp ,:tf)";
$pdo = $db->prepare($query);
$pdo->bindParam(":tn",$childname);
$pdo->bindParam(":tl",$newtreelevel);
$pdo->bindParam(":tp",$arr[$count-1]);
$pdo->bindParam(":tf",$condition);
$pdo->execute();
echo "success";
}
else{
    echo "failed";
}

//INSERT INTO `logonscript`.`tbl_tree` (`treename`, `treelevel`, `treeparent`, `treefilter`) VALUES ('TS', '4', 'ZB', 'MKZBTS');

?>