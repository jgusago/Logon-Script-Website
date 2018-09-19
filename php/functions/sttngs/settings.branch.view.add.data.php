<?php
$parent = $_POST['parent'];
$childname = $_POST['childname'];
$condition = $_POST['condition'];

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
$arr = explode("->",$parent);
$count = count($arr);

$checkq = "SELECT * FROM logonscript.tbl_tree WHERE treename LIKE :tn AND treeparent LIKE :tp";
$checkpdo = $db->prepare($checkq);
$checkpdo->bindParam(":tn",$childname);
$checkpdo->bindParam(":tp",$arr[$count-1]);
$checkpdo->execute();
$rowcount = $checkpdo->rowCount();

if ($rowcount == 0){

$query = "INSERT INTO logonscript.tbl_tree (treename, treelevel, treeparent, treefilter) VALUES ( :tn, :tl, :tp ,:tf)";
$pdo = $db->prepare($query);
$pdo->bindParam(":tn",$childname);
$pdo->bindParam(":tl",$count);
$pdo->bindParam(":tp",$arr[$count-1]);
$pdo->bindParam(":tf",$condition);
echo "success";
}
else{
    echo "failed";
}

//INSERT INTO `logonscript`.`tbl_tree` (`treename`, `treelevel`, `treeparent`, `treefilter`) VALUES ('TS', '4', 'ZB', 'MKZBTS');

?>