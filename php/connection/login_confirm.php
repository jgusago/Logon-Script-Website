<?php

$username = $_POST["username"];
$password = $_POST["password"];
$ecpassword =  md5(sha1($password));

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$stmt = $db->prepare("SELECT * from tbl_user WHERE userid=? AND password=?");
$stmt->execute(array($un, $pw));
$row_count = $stmt->rowCount();


$stmt = $db->prepare("SELECT * from tbl_user WHERE userid=? AND password=?");
$stmt->execute(array($username, $ecpassword));
$row_count = $stmt->rowCount();

if ($row_count > 0) {

    echo "success";

    }

else {
    
    echo "something went wrong";
}
?>