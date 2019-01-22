<?php
header("Content-Type: application/json; charset=UTF-8");
$obj = json_decode($_POST["x"], false);
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$query = $conn->prepare("SELECT
                            processor,
                            HDD_Serial,
                            MAC_Address,
                            mb_manufacturer,
                            mb_product,
                            remarks,
                            agent_version,
                            OS,
                            System_type
                        FROM logonscript.tbl_computer_details
                        WHERE hostname like ?");

$query->bind_param("s",$obj->hostname);
$query->execute();
$result = $query->get_result();
$outp = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($outp);
mysqli_close($conn);
?>
