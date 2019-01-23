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
	if(iMonitor_Status="End Task" and sysSetting_File = "Not Found","Not Installed", ""),
	if(iMonitor_Status = "Running" and sysSetting_File = "Not Found", "Not Setup",""),
	if(iMonitor_Status = "End Task" and sysSetting_File = "Found", "Not Running",""),
	if(iMonitor_Status = "Running" and sysSetting_File = "Found", "Installed and Running","")
    )as software_status,
concat(
	if(sysSetting_File = "Not Found" and connection_status = "UNESTABLISHED","Not Configured/No Server IP",""),
    if(sysSetting_File = "Not Found" and connection_status = "ESTABLISHED","Not Configured/No Server IP",""),
    if(sysSetting_File = "Found" and connection_status = "UNESTABLISHED",concat("Unstable Connection: ",serverIP),""),
    if(sysSetting_File = "Found" and connection_status = "ESTABLISHED",concat("Connected: ",serverIP),"")
) as connection_status,
update_time as scan_time
from logonscript.tbl_log
left join tbl_employee on (
      (tbl_employee.emp_id = tbl_log.user) or
      (tbl_employee.emp_login = tbl_log.user) or
      (tbl_employee.emp_login2 = tbl_log.user))
where tbl_log.hostname like
  		(select concat(tree_filter,"%") from tbl_tree where tree_id = ?)
group by hostname;
