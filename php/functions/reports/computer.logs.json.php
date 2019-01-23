<?php
header("Content-Type: application/json; charset=UTF-8");

$obj = json_decode($_POST["x"], false);
  require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
  $sql = file_get_contents("{$_SERVER['DOCUMENT_ROOT']}/sql/computer.list.sql");
  $query = $conn->prepare("
  select
  hostname,
  group_concat(distinct
  	if(
  		(tbl_log.user = tbl_employee.emp_id) or
  		(tbl_log.user = tbl_employee.emp_login) or
  		(tbl_log.user = tbl_employee.emp_login2),
  		tbl_employee.emp_name,
  		tbl_log.user)) as user,
  domain_name as domain,
  ip_address,
  concat(
  	if(iMonitor_Status=\"End Task\" and sysSetting_File = \"Not Found\",\"Not Installed\", \"\"),
  	if(iMonitor_Status = \"Running\" and sysSetting_File = \"Not Found\", \"Not Setup\",\"\"),
  	if(iMonitor_Status = \"End Task\" and sysSetting_File = \"Found\", \"Not Running\",\"\"),
  	if(iMonitor_Status = \"Running\" and sysSetting_File = \"Found\", \"Installed and Running\",\"\")
      )as software_status,
  concat(
  	if(sysSetting_File = \"Not Found\" and connection_status = \"UNESTABLISHED\",\"Not Configured/No Server IP\",\"\"),
      if(sysSetting_File = \"Not Found\" and connection_status = \"ESTABLISHED\",\"Not Configured/No Server IP\",\"\"),
      if(sysSetting_File = \"Found\" and connection_status = \"UNESTABLISHED\",concat(\"Unstable Connection: \",serverIP),\"\"),
      if(sysSetting_File = \"Found\" and connection_status = \"ESTABLISHED\",concat(\"Connected: \",serverIP),\"\")
  ) as connection_status,
  update_time as scan_time
  from logonscript.tbl_log
  left join tbl_employee on (
        (tbl_employee.emp_id = tbl_log.user) or
        (tbl_employee.emp_login = tbl_log.user) or
        (tbl_employee.emp_login2 = tbl_log.user))
  where tbl_log.hostname like
    		(select concat(tree_filter,\"%\") from tbl_tree where tree_id = ?)
  group by hostname;"
    );
  $query->bind_param("s",$obj->log_id);
  $query->execute();
$result = $query->get_result();
$outp = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($outp);
mysqli_close($conn);
$db = null;
?>
