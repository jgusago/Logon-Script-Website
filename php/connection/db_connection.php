<?php
    //$db = new PDO('mysql:host=172.16.39.241;dbname=logonscript;charset=utf8mb4', 'administrator', 'Agsmc999');
    $db = new PDO('mysql:host=172.16.31.39;dbname=logonscript;charset=utf8mb4', 'administrator', 'Agsmc999');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

    /*
    *$con = mysqli_connect('172.16.39.241','administrator','Agsmc999','logonscript');
    if(!$con){
        trigger_error("NO CONNECTION");
    }*/
    ?>