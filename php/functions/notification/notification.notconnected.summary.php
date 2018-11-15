<?php

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

session_start();
if ($_SESSION['role'] !== "STAFF"){
    $query =  ""
}
else{

}

?>