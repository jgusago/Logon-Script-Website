<?php
$userid = $_POST['userid'];
$name = $_POST['name'];
$department = $_POST['department'];
$position = $_POST['positon'];
$role = $_POST['role'];
$status = $_POST['Status'];
$password = $_POST['password'];

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

//Check if already have a record
if ($update == "true"){
    if($olduserid == $userid){

        $query = "UPDATE logonscript.tbl_user SET `name`=:name, `department`=:department, `position`=:position, `role`=:role, `status`=:status, `password`=:password WHERE (`userid` = :userid)";
        $pdo = $db->prepare($query);
        $pdo->bindParam(":name",$name);
        $pdo->bindParam(":department",$department);
        $pdo->bindParam(":position",$position);
        $pdo->bindParam(":role",$role);
        $pdo->bindParam(":status",$status);
        $pdo->bindParam(":password",$password);
        $pdo->execute();
    }
    if($position !== ""){
        $query = "UPDATE logonscript.tbl_user SET `position`=:position WHERE (`userid` = :userid)";
        $pdo = $db->prepare($query);
        $pdo->bindParam(":position",$position);
        $pdo->execute();
    }
}

$pdo = null;
$pdo2 = null;
?>
