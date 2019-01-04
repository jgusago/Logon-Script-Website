<?php
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

session_start();
echo "Transaction Date|Transaction Name|Transaction Details|User";

    $query = "SELECT * FROM logonscript.tbl_history ORDER BY history_id DESC";

    foreach ($db->query($query) as $row) 
    {

        $transact_name = $row['transact_name'];
        $transact_details = $row['transact_details'];
        $transact_date = $row['transact_date'];
        $user_id = $row['user_id'];

        echo "#$transact_date|$transact_name|$transact_details|$user_id";

    }

?>