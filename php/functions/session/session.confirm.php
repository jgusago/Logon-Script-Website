<?php
session_start();
if (isset($_SESSION["userid"])){
  $id = $_SESSION["userid"];
  $role = $_SESSION["role"];
  $name = $_SESSION["name"];
  $status = $_SESSION["status"];
  $department = $_SESSION["department"];
  $position = $_SESSION["position"];
  echo $status.";".$role.";".$department.";".$name.";".$id.";".$position;

}
else{
  echo "failed";
}

?>
