<?php
header("Content-Type: application/json; charset=UTF-8");
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
require "{$_SERVER['DOCUMENT_ROOT']}/php/functions/session/session.check.php";

$status = $conn->prepare("
SELECT COUNT(distinct hostname) as count, \"card\" as element, \"exclamation\" as display, \"Disconnected\" as name FROM logonscript.tbl_log
  WHERE (connection_status not like 'ESTABLISHED' or iMonitor_Status not like 'running')
  AND hostname like concat((SELECT tree_filter FROM tbl_tree where tree_name LIKE ?),\"%\");
");
$status->bind_param("s",$ssdepartment);
$status->execute();
$statusr = $status->get_result();
$status = $statusr->fetch_all(MYSQLI_ASSOC);

$versionq =$conn->prepare("
SELECT COUNT(distinct hostname) as count, \"card\" as element, \"upload\" as display, \"Need Update\" as name FROM logonscript.tbl_computer_details
  WHERE tbl_computer_details.agent_version != ALL(SELECT version FROM tbl_agent_version WHERE type = 'valid')
  AND hostname like concat((SELECT tree_filter FROM tbl_tree where tree_name LIKE ?),\"%\");
");
$versionq->bind_param("s",$ssdepartment);
$versionq->execute();
$versionr = $versionq->get_result();
$version = $versionr->fetch_all(MYSQLI_ASSOC);

$installq =$conn->prepare("
SELECT COUNT(distinct hostname) as count, \"card\" as element, \"desktop\" as display, \"Installed\" as name FROM logonscript.tbl_log
  WHERE hostname like concat((SELECT tree_filter FROM tbl_tree where tree_name LIKE ?),\"%\");
");
$installq->bind_param("s",$ssdepartment);
$installq->execute();
$installr = $installq->get_result();
$install = $installr->fetch_all(MYSQLI_ASSOC);

$employeeq =$conn->prepare("
SELECT COUNT(distinct emp_id) as count, \"card\" as element, \"users\" as display, \"Employees\" as name  FROM logonscript.tbl_employee
  WHERE dept like ?;
");
$employeeq->bind_param("s",$ssdepartment);
$employeeq->execute();
$employeer = $employeeq->get_result();
$employee = $employeer->fetch_all(MYSQLI_ASSOC);


if($ssrole == "ADMINISTRATOR" || $ssrole == "SUPER ADMIN"){
  $parent = "root";
}
else{
  $parent = $ssdepartment;
}

$rootq =$conn->prepare("SELECT tree_name, tree_filter as filter, tree_computer_count as no_comp FROM logonscript.tbl_tree WHERE tree_parent = ? ORDER BY tree_name ASC");
$rootq->bind_param("s",$parent);
$rootq->execute();
$rootr = $rootq->get_result();
$root = $rootr->fetch_all(MYSQLI_ASSOC);
$prog = array();
foreach($root as $row){

  $progq =$conn->prepare("SELECT  COUNT(distinct hostname) as count, \"progressbar\" as element,  ? as display, ? as name
  FROM logonscript.tbl_log WHERE hostname LIKE concat(?,\"%\")");
  $progq->bind_param("sss",$row["no_comp"],$row["tree_name"],$row['filter']);
  $progq->execute();
  $progr = $progq->get_result();
  $prog  = array_merge($prog, $progr->fetch_all(MYSQLI_ASSOC));
}
$summary = array_merge($status,$version,$install,$employee,$prog);
echo json_encode($summary);

mysqli_close($conn);
$db = null;
?>
