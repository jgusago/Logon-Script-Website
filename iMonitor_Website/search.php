
<?php

/*session_start();
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
 
if(!empty($_POST["keyword"])) {
$sql = "SELECT DISTINCT user FROM tbl_log WHERE user like '" . $_POST["keyword"] . "%' ORDER BY user LIMIT 0,6";
$stmt = $db->prepare($sql);
$stmt->execute();
$row_count = $stmt->rowCount();
if(!empty($row_count)) {
?>
<ul id="province_list">
<?php
foreach($stmt as $row) {
?>
<li onClick="selectCountry('<?php echo $row["user"]; ?>');"><?php echo $row["user"]; ?></li>
<?php } ?>

<?php } }*/ 
session_start();
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
 
if(!empty($_POST["keyword"])) {
$sql = "SELECT DISTINCT user FROM tbl_log WHERE user like '" . $_POST["keyword"] . "%' ORDER BY user LIMIT 0,6";
$stmt = $db->prepare($sql);
$stmt->execute();
$row_count = $stmt->rowCount();
if(!empty($row_count)) {
foreach($stmt as $row) {
echo $row["user"];
        }
    }
}
?>