
<?php

session_start();
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
 
if(!empty($_POST["keyword"])) {
$sql = "SELECT DISTINCT user FROM tbl_log WHERE user like '" . $_POST["keyword"] . "%' ORDER BY user LIMIT 0,6";
$stmt = $db->prepare($sql);
$stmt->execute();
$row_count = $stmt->rowCount();
if(!empty($row_count)) {
?>
<ul id="suggestion_list">
<?php
foreach($stmt as $row) {
?>
<li onKeyup="selectUser('<?php echo $row["user"]; ?>');"><?php echo $row["user"]; ?></li>

<?php } ?>

<?php } }
?>