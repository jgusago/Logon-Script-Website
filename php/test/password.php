<?php

$password = "Agsmc999";

$ecpassword = md5(sha1($password));
$hashpassword = password_hash($password,PASSWORD_DEFAULT);
echo $ecpassword."<br>".$hashpassword;
?>
