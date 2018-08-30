<?php
session_start();
include("connection.php");
  
$un = $_POST['username'];
$pw = $_POST['password'];

//PDO
//$stmt = $db->prepare("SELECT * from tbl_users WHERE username=? AND password=?");
//$stmt->execute(array($un, $pw));
//$row_count = $stmt->rowCount();

//MySQLi
<?php
$sql = "SELECT * from tbl_users WHERE username=? AND password=?";
$result = $conn->query($sql);

if($row_count >0)
{
$_SESSION['username'] = $un;
header("Location: ../.superadmin.html");
}
else
{
header("Location: ../index.php?msg=wrong");
}
?>
                                     