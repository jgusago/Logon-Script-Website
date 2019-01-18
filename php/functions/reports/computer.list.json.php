<?php
header("Content-Type: application/json; charset=UTF-8");

$obj = json_decode($_POST["x"], false);
  require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

  $query = $conn->prepare("
  select
  		tbl_log.hostname,
          group_concat(distinct
  			if(
  				(tbl_log.user = tbl_employee.emp_id) or
  				(tbl_log.user = tbl_employee.emp_login) or
  				(tbl_log.user = tbl_employee.emp_login2),
  				tbl_employee.emp_name,
  				tbl_log.user)) as user,
          tbl_log.ip_address,
          concat(
  			if(connection_status=\"ESTABLISHED\",\"Connected\",\"Not Connected\"),
              if((connection_status=\"ESTABLISHED\" and iMonitor_Status=\"Running\") or
  				(connection_status=\"UNESTABLISHED\" and iMonitor_Status=\"End Task\"),\" & \",\" but \"),
              if(iMonitor_Status=\"Running\",\"Running\",concat(\"Missing: \",services))
              ) as services,
          tbl_computer_details.remarks,
          tbl_computer_details.agent_version,
          group_concat(distinctrow
  			concat(month(transact_date),\"-\",day(transact_date),\"-\",year(transact_date))
              order by tbl_history.transact_date desc) as date_checked

  from tbl_log
  	inner join tbl_computer_details on tbl_log.hostname = tbl_computer_details.hostname
      left join tbl_history on (tbl_history.transact_details) like concat(\"%\",tbl_log.hostname,\"%\")
      left join tbl_employee on (
      (tbl_employee.emp_id = tbl_log.user) or
      (tbl_employee.emp_login = tbl_log.user) or
      (tbl_employee.emp_login2 = tbl_log.user)
      )
      where tbl_log.hostname like
  		(select concat(tree_filter,\"%\") from tbl_tree where tree_id = ?)
      group by tbl_log.hostname"
    );
  $query->bind_param("s",$obj->log_id);
  $query->execute();
$result = $query->get_result();
$outp = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($outp);

?>
