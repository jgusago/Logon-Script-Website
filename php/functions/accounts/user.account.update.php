<?php
session_start();
//name:name,department:department,position:position,role:role,status:status,password:password,id:id
$id = $_POST['id'];
$name = $_POST['name'];
$department = $_POST['department'];
$position = $_POST['position'];
$role = $_POST['role'];
$status = $_POST['status'];
$password = $_POST['password'];

$EditUser = "Edit User";
$userid2 = $_SESSION["userid"];
$namestat = "";

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
    $oldname = "";
    $olddepartment = "";
    $oldposition = "";
    $oldrole = "";
    $oldstatus = "";
    $oldpassword = "";

//Get Old Value
$oldvalue = "SELECT * FROM logonscript.tbl_user WHERE userid = '$id'";
foreach ($db->query($oldvalue) as $row) {
    $oldname = $row['name'];
    $olddepartment = $row['department'];
    $oldposition = $row['position'];
    $oldrole = $row['role'];
    $oldstatus = $row['status'];
    $oldpassword = $row['password'];
}

if($oldname !== $name && $name !== ""){
     $query = "UPDATE logonscript.tbl_user SET `name`='$name' WHERE (`userid` = '$id')";
     $db->query($query);
     $namestat = true;

 }
 if($olddepartment !== $department && $department !== "")
 {
     $query = "UPDATE logonscript.tbl_user SET `department`='$department' WHERE (`userid` = '$id')";
     $db->query($query);
     $namestat = true;
 }
 if($oldposition !== $position && $position !== "")
 {
     $query = "UPDATE logonscript.tbl_user SET `position`='$position' WHERE (`userid` = '$id')";
     $db->query($query);
     $namestat = true;

     $sql = "INSERT INTO tbl_history (transact_name, transact_details, transact_date, user_id)
     VALUES ('Edit User', 'Position: ".$_POST["position"]."', NOW(), '$userid2')";
     ($db->query($sql));
 }
 if($oldrole !== $role && $role !== "")
 {
     $query = "UPDATE logonscript.tbl_user SET `role`='$role' WHERE (`userid` = '$id')";
     $db->query($query);
     $namestat = true;

 }
 if($oldstatus !== $status && $status !== "")
 {
     $query = "UPDATE logonscript.tbl_user SET `status`='$status' WHERE (`userid` = '$id')";
     $db->query($query);
     $namestat = true;
 }

$newpassword =  md5(sha1($password));
 if ($oldpassword !== $newpassword && $password !== "")
 {
         $query = "UPDATE logonscript.tbl_user SET `password`='$newpassword' WHERE (`userid` = '$id')";
         $db->query($query);
         $namestat = true;
 }

 if($namestat == true)
 {
     echo "true";
}
else
{
    echo "false";
}

$edit = "";
$queryvar = $db->prepare("SELECT userid,name,department, position, role, status FROM tbl_user WHERE userid='$id'");
$queryvar->execute();
$queryvar->setFetchMode(PDO::FETCH_ASSOC);
while ($row = $queryvar->fetch()) {

    $name = $row['name'];
    $department = $row['department'];
    $position = $row['position'];
    $role = $row['role'];
    $status = $row['status'];

if($name != $oldname)
    $edit .= "Name: ".$name." | ";
if($department != $olddepartment)
     $edit .= "Department: ".$department." | ";
if($position != $oldposition)
    $edit .= "Position: ".$position." | ";
if($role != $oldrole)
    $edit .=  "Role: ".$role." | ";
if($status != $oldstatus)
    $edit .=  "Status: ".$status." | ";
}


$sqlqurey = "INSERT INTO tbl_history (transact_name, transact_details, transact_date, user_id)

VALUES ('Edit User', '$edit', NOW(), '$userid2')";
//VALUES ('$EditUser', 'Name:".$_POST["name"].",Department:".$_POST["department"].",Position:".$_POST["position"].",Role:".$_POST["role"].",Status:".$_POST["status"]."', NOW(), '$userid2')";
($db->query($sqlqurey));


$db = null;
?>
