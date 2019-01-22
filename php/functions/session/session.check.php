<?php
session_start();
if (isset($_SESSION["userid"])){
  $ssid = $_SESSION["userid"];
  $ssrole = $_SESSION["role"];
  $ssname = $_SESSION["name"];
  $ssstatus = $_SESSION["status"];
  $ssdepartment = $_SESSION["department"];
  $ssposition = $_SESSION["position"];
  $ss = true;
}
else{
  $ss = false;
}

?>
