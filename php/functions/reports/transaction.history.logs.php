<?php
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

session_start();
echo "Transact Name|Transact Details|Transact Date|User";

    $query = "SELECT * FROM logonscript.tbl_history";

    foreach ($db->query($query) as $row) 
    {

        $transact_name = $row['transact_name'];
        $transact_details = $row['transact_details'];
        $transact_date = $row['transact_date'];
        $user_id = $row['user_id'];

        echo "#$transact_name|$transact_details|$transact_date|$user_id";

    }

?>