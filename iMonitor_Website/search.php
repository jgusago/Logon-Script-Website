
<?php

session_start();
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
 
if(!empty($_POST["keyword"])) {
$sql = "SELECT * FROM user WHERE user like '" . $_POST["keyword"] . "%' ORDER BY user LIMIT 0,6";
$stmt = $db->prepare($sql);
$stmt->execute();
if(!empty($row)) {
?>
<ul id="">
<?php
foreach($stmt as $row) {
?>
<li onClick="selectUser('<?php echo $user["user"]; ?>');"><?php echo $user["user"]; ?></li>
<?php } ?>
</ul>
<?php } } ?>