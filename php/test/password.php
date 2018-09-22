<?php

$password = "Agsmc999";

$ecpassword = password_hash($password, PASSWORD_DEFAULT);;

echo $ecpassword;
?>