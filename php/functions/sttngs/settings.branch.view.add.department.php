<?php

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$branch = $_POST['branch'];
$path = $_POST['path'];
$dept = $_POST['dept'];
$filter = $_POST['filter'];

$query = "UPDATE logonscript.tbl_user SET `name`='$name' WHERE (`userid` = '$userid')";
$db->query($query);
$namestat = true;

?>
