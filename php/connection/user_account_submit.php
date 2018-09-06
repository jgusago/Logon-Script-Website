<?php
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

        $sql = "INSERT INTO sys_user (userid, name, department, position, role, password)
         
        VALUES ('".$_POST["userid"]."', '".$_POST["name"]."', '".$_POST["department"]."', '".$_POST["position"]."', '".$_POST["role"]."', '".$_POST["password"]=md5($_POST['password'])."')";
        ($db->query($sql));
        header("Location: admin_users.php?msg=correct");

?>