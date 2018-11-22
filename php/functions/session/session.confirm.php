<?php
session_start();
if (isset($_SESSION["userid"])){
  $id = $_SESSION["userid"];
  $role = $_SESSION["role"];
  $name = $_SESSION["name"];
  $status = $_SESSION["status"];
  $department = $_SESSION["department"];
  echo $status.";".$role.";".$department.";".$name.";".$id;

}
else{
  echo "failed";
}

?>
