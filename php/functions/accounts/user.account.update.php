<?php
session_start();

$userid = $_POST['userid'];
$name = $_POST['name'];
$department = $_POST['department'];
$position = $_POST['position'];
$role = $_POST['role'];
$status = $_POST['status'];
$password = $_POST['password'];

$userid = $_POST["userid"];
$EditUser = "Edit User";
$userid2 = $_SESSION["userid"];

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

//Get Old Value
$oldvalue = "SELECT * FROM logonscript.tbl_user WHERE userid = '$userid'";
foreach ($db->query($oldvalue) as $row) {
    $oldname = $row['name'];
    $olddepartment = $row['department'];
    $oldposition = $row['position'];
    $oldrole = $row['role'];
    $oldstatus = $row['status'];
    $oldpassword = $row['password'];
}

if($oldname !== $name && $name !== ""){
     $query = "UPDATE logonscript.tbl_user SET `name`='$name' WHERE (`userid` = '$userid')";
     $db->query($query);
     $namestat = true;

 }
 if($olddepartment !== $department && $department !== ""){
     $query = "UPDATE logonscript.tbl_user SET `department`='$department' WHERE (`userid` = '$userid')";
     $db->query($query);
     $namestat = true;
 }
 if($oldposition !== $position && $position !== ""){
     $query = "UPDATE logonscript.tbl_user SET `position`='$position' WHERE (`userid` = '$userid')";
     $db->query($query);
     $namestat = true;

     $sql = "INSERT INTO tbl_history (transact_name, transact_details, transact_date, user_id)       
     VALUES ('$EditUser', 'Position:".$_POST["position"]."', NOW(), '$userid2')";
     ($db->query($sql));
 }
 if($oldrole !== $role && $role !== ""){
     $query = "UPDATE logonscript.tbl_user SET `role`='$role' WHERE (`userid` = '$userid')";
     $db->query($query);
     $namestat = true;
 
 }
 if($oldstatus !== $status && $status !== ""){
     $query = "UPDATE logonscript.tbl_user SET `status`='$status' WHERE (`userid` = '$userid')";
     $db->query($query);
     $namestat = true;
 }

 if ($password !== ""){
     $password = md5(sha1($password)); 
     if($oldpassword !== $password){
         $query = "UPDATE logonscript.tbl_user SET `password`='$password' WHERE (`userid` = '$userid')";
         $db->query($query);
         $namestat = true;
     }
 }

 if($namestat == true){
     echo "true";
}
else{
    echo "flase";
}
    
$query2 = $db->prepare("SELECT userid,name,department, position, role, status FROM tbl_user WHERE userid='$userid'");
$query2->execute();
$query2->setFetchMode(PDO::FETCH_ASSOC);
while ($row = $query2->fetch()) {
    
    $userid = $row['userid'];
    $name = $row['name'];
    $department = $row['department'];
    $position = $row['position'];
    $role = $row['role'];
    $status = $row['status'];
}

    
$sqlqurey = $db->prepare("SELECT userid,name,department, position, role, status FROM tbl_user WHERE userid='$userid'");
$sqlqurey->execute();
$sqlqurey->setFetchMode(PDO::FETCH_ASSOC);
while ($row = $sqlqurey->fetch()) {


if($name != $row['name'])
    $sqlqurey += $row['name'];
if($department != $row['department'])
    $sqlqurey += $row['department'];
if($position != $row['position'])
    $sqlqurey += $row['position'];
if($role != $row['role'])
    $sqlqurey += $row['role'];
if($status != $row['status'])
    $sqlqurey += $row['status'];
    
    
$sqlqurey2 = "INSERT INTO tbl_history (transact_name, transact_details, transact_date, user_id)
             
VALUES ('$AddUser', '$sqlqurey', NOW(), '$userid2')";
($db->query($sqlqurey2));
}
?>
