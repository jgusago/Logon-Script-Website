<?php
$hostname = $_POST["hostname"];
$count = 0;
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
//Connection

/*
echo "Computer Name|User ID|Domain|IP Address|Services Status|Server Status|Branch|Scan Time";
*/
$query = "SELECT * FROM logonscript.tbl_log WHERE hostname LIKE :hostname GROUP BY hostname";

$pdo = $db->prepare($query);
$pdo->bindParam(":hostname",$hostname);
$pdo->execute();
$result = $pdo->fetchAll();
foreach($result as $row){
    $hostname = $row['hostname'] ?: 'null';
    $domain_name = $row['domain_name'] ?: 'null';
    $ip_address = $row['ip_address'] ?: 'null';
    $ip_date_modefied = $row['ip_date_modified'] ?: 'null';
    $iMonitor_Status = $row['iMonitor_Status'] ?: 'Not Found';
    $services = $row['services'] ?: 'All Running';
    $sysSetting_File = $row['sysSetting_File'] ?: 'Not Found';
    $serverIP = $row['serverIP'] ?: 'Not Found';
    $connections_status = $row['connection_status'] ?: 'Not Connected';
    $branch = $row['branch'] ?: 'Scan Failed';
    $scan_time = $row['scan_time'] ?: 'null';
    $date = $scan_time;

    if($row['connection_status'] == "ESTABLISHED"  && $row['iMonitor_Status'] == "Running")
        $currentstatus = "On-line";
    else{
        $currentstatus = "Off-line";
      }
}
  echo "Processor|Operating System|System Type|Disk Serial|MAC Address|Manufacturer|Motherboard Product|Status|Agent Version";

  $newquery = "SELECT * FROM logonscript.tbl_computer_details WHERE hostname LIKE :hostname GROUP BY hostname";

  $newpdo = $db->prepare($newquery);
  $newpdo->bindParam(":hostname",$hostname);
  $newpdo->execute();
  $newresult = $newpdo->fetchAll();

  if (count($newresult) != 0){
    foreach ($newresult as $row) {

      if(empty($row['processor'])){
        $row['processor'] = "";
      }
      if(empty($row['HDD_Serial'])){
        $row['HDD_Serial'] = "";
      }
      if(empty($row['MAC_Address'])){
        $row['MAC_Address'] = "";
      }
      if(empty($row['mb_manufacturer'])){
        $row['mb_manufacturer'] = "";
      }
      if(empty($row['mb_product'])){
        $row['mb_product'] = "";
      }
      if(empty($row['status']))
      {
        $row['status'] = "";
      }
      if(empty($row['agent_version']))
      {
        $row['agent_version'] = "";
      }
      if(empty($row['OS']))
      {
        $row['OS'] = "";
      }
      if(empty($row['System_type']))
      {
        $row['System_type'] = "";
      }

      $processor = $row['processor'];
      $serial = $row['HDD_Serial'];
      $macaddress = $row['MAC_Address'];
      $manufacturer = $row['mb_manufacturer'];
      $model = $row['mb_product'];
      $status = $row['status'];
      $version = $row['agent_version'];
      $OS = $row['OS'];
      $system_type = $row['System_type'];


      //echo "#$processor|$serial|$macaddress|$manufacturer|$model|$status|input`form-control`id:agentversion~type:text~placeholder:$version~onkeypress:remarksupdate(\"$version\")`$version";
    }
  }
  else{
      $processor = "No Data Found";
      $serial = "No Data Found";
      $macaddress = "No Data Found";
      $manufacturer = "No Data Found";
      $model = "No Data Found";
      $status = "No Data Found";
      $version = "No Data Found";
      $OS = "No Data Found";
      $system_type = "No Data Found";
  }

echo "#$processor|p`form-control~font-weight-bold`value:$OS`$OS|p`form-control~font-weight-bold`value:$system_type`$system_type|$serial|$macaddress|$manufacturer|$model|$currentstatus|input`form-control~font-weight-bold`id:CMPLISTdtlsagentversion~type:text~value:$version~placeholder:$version~onkeyup:CMPLISTdtlsremarksupdate(\"$version\",\"CMPLISTdtlsagentversion\")`\"$version\"";

?>
