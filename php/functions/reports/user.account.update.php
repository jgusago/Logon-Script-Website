<?php
$userid = $_POST['userid'];
$name = $_POST['name'];
$department = $_POST['department'];
$position = $_POST['positon'];
$role = $_POST['role'];
$status = $_POST['Status'];
$password = $_POST['password'];
//$hostname = "AEITOM073137";
//$remarks = "test";
//$version = "123456";
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

//echo "$remarks<br>$version<br>$hostname<br>$update<br>";


//$sql = "SELECT * FROM logonscript.tbl_computer_details WHERE hostname like '$hostname'";
//foreach ($db->query($sql) as $row){
//$oldversion = $row['agent_version'];
//$oldremarks = $row['remarks'];
//}


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
        $pdo->bindParam(":name",$name);
        $pdo->bindParam(":department",$department);
        $pdo->bindParam(":position",$position);
        $pdo->bindParam(":role",$role);
        $pdo->bindParam(":status",$status);
        $pdo->bindParam(":password",$password);
        $pdo->execute();
    }
}
//else{
    //$query2 = "INSERT INTO tbl_computer_details (hostname, processor, hdd_Serial, mac_Address, mb_manufacturer, mb_product, scan_time, ip, status, remarks, agent_version) VALUES (?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?, ?)";
    //$pdo2 = $db->prepare($query2);
    //$pdo2->execute([$hostname, $remarks, $version]);
//}

$pdo = null;
$pdo2 = null;
?>
