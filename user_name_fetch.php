<?php
    $query = $db->prepare("SELECT name FROM tbl_user WHERE userid=:userid");
    $query->bindValue(':userid', $_SESSION['userid'], PDO::PARAM_STR);
    $query->execute();
    $query->setFetchMode(PDO::FETCH_ASSOC);
         
        while ($row = $query->fetch()) {
        echo 'Welcome: ' . $row['name'];
        }
?>