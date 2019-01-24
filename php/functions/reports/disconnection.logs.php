<?php
header("Content-Type: application/json; charset=UTF-8");
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
require "{$_SERVER['DOCUMENT_ROOT']}/php/functions/session/session.check.php";

if($ssrole == "ADMINISTRATOR" || $ssrole == "SUPER ADMIN"){
  $query = $conn->prepare("
  SELECT MAX(scan_date) as detectiontime, MIN(scan_date) as endtime,  hostname, tbl_log_history.userid, tbl_user.name, tbl_log_history.ip_address, tbl_log_history.services, tbl_log_history.branch as branch FROM logonscript.tbl_log_history
    left join tbl_log on tbl_log_history.ip_address = tbl_log.ip_address
    left join tbl_user on tbl_log_history.userid = tbl_user.userid
  WHERE scan_date > DATE_ADD(NOW(), INTERVAL -30 DAY) and tbl_log_history.userid not like 'admin%'
    group by tbl_log_history.ip_address order by MAX(scan_date) Desc
  ");
  $query->execute();
  $result = $query->get_result();
  $outp = $result->fetch_all(MYSQLI_ASSOC);
  echo json_encode($outp);
}
else{
  $query = $conn->prepare("
  SELECT MAX(scan_date) as detectiontime, MIN(scan_date) as endtime,  hostname, tbl_log_history.userid, tbl_user.name, tbl_log_history.ip_address, tbl_log_history.services, tbl_log_history.branch as branch, tbl_log_history.branch as branch FROM logonscript.tbl_log_history
    left join tbl_log on tbl_log_history.ip_address = tbl_log.ip_address
    left join tbl_user on tbl_log_history.userid = tbl_user.userid
  WHERE scan_date > DATE_ADD(NOW(), INTERVAL -30 DAY) and tbl_log_history.userid not like 'admin%'
    AND tbl_log.hostname like concat((select tree_filter from tbl_tree where tbl_tree.tree_name like ?),\"%\")
  group by tbl_log_history.ip_address order by MAX(scan_date) Desc
  ");
  $query->bind_param("s",$ssdepartment);
  $query->execute();
  $result = $query->get_result();
  $outp = $result->fetch_all(MYSQLI_ASSOC);
  echo json_encode($outp);
}



mysqli_close($conn);
$db = null;
?>
