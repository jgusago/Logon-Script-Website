<?php
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
$post = $_POST["currentval"];

session_start();
$id = $_SESSION["userid"];

if($post !== "null" && $post !== "" && $post !== null){

$query = "INSERT into logonscript.tbl_user ";


}




 ?>
