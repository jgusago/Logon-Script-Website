<?php
session_start();

$userid = $_POST['userid'];
$name = $_POST['name'];
$department = $_POST['department'];
$position = $_POST['position'];
$role = $_POST['role'];
$status = $_POST['status'];
$password = $_POST['password'];

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

    $sql = "INSERT INTO tbl_history (transact_name, transact_details, transact_date, user_id)       
    VALUES ('$EditUser', 'Name:".$_POST["name"]."', NOW(), '$userid2')";
    ($db->query($sql));
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

//$sql2 = "INSERT INTO tbl_history (transact_name, transact_details, transact_date, user_id)
             
//VALUES ('$AddUser', 'UserID:".$_POST["userid"].",Name:".$_POST["name"].",Department:".$_POST["department"].",Role:".$_POST["role"].",Status:".$_POST["status"]."', NOW(), '$userid2')";
//($db->query($sql2));
?>
