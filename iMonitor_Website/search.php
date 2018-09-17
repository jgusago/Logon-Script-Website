
<?php

session_start();
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
 
$db_handle = new PDO();
if(!empty($_POST["keyword"])) {
$query ="SELECT * FROM user WHERE user like '" . $_POST["keyword"] . "%' ORDER BY user LIMIT 0,6";
$result = $db_handle->runQuery($query);
if(!empty($result)) {
?>
<ul id="">
<?php
foreach($result as $country) {
?>
<li onClick="selectUser('<?php echo $user["user"]; ?>');"><?php echo $user["user"]; ?></li>
<?php } ?>
</ul>
<?php } } ?>