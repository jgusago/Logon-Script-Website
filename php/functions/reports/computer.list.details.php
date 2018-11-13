<?php
$hostname = $_POST["hostname"];
//$hostname = "AEITOM073137";
$count = 0;
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
//Connection

/*
echo "Computer Name|User|Domain|IP Address|Services Status|Server Status|Branch|Scan Time";
*/
$query = "SELECT * FROM logonscript.tbl_log WHERE hostname LIKE :hostname AND user not like 'admi%' GROUP BY hostname";

$pdo = $db->prepare($query);
$pdo->bindParam(":hostname",$hostname);
$pdo->execute();
$result = $pdo->fetchAll();
foreach($result as $row){
    $hostname = $row['hostname'] ?: 'null';
    $user = $row['user'] ?: 'null';
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

    $date = explode(" ",$scan_time);

    $date[0] = preg_replace("/[^a-zA-Z]/", "", $date[0]);

    if ($newdate = new DateTime($date[0]." ".$date[1])){

    $scan_time = date_format($newdate, "M-d-Y H:i");
    }
    //echo "#$hostname|$user|$domain_name|$ip_address~$ip_date_modefied|iMonitor Status: $iMonitor_Status~Missing Services: $services~Config: $sysSetting_File|Server IP: $serverIP~Connection Status: $connections_status|$branch|$scan_time";

    if($row['connection_status'] == "ESTABLISHED"  && $row['iMonitor_Status'] == "Running")
        $currentstatus = "On-line";
    else{
        $currentstatus = "Off-line";
      }
}
  echo "Processor|Disk Serial|MAC Address|Manufacturer|Model|Status|Agent Version";

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
      if(empty($row['hdd_Serial'])){
        $row['hdd_Serial'] = "";
      }
      if(empty($row['mac_Address'])){
        $row['mac_Address'] = "";
      }
      if(empty($row['mb_manufacturer'])){
        $row['mb_manufacturer'] = "";
      }
      if(empty($row['mb_product'])){
        $row['mb_product'] = "";
      }
      if(empty($row['status'])){
        $row['status'] = "";
      }
      if(empty($row['agent_version'])){
        $row['agent_version'] = "";
      }

      $processor = $row['processor'];
      $serial = $row['hdd_Serial'];
      $macaddress = $row['mac_Address'];
      $manufacturer = $row['mb_manufacturer'];
      $model = $row['mb_product'];
      $status = $row['status'];
      $version = $row['agent_version'];


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
  }


echo "#$processor|$serial|$macaddress|$manufacturer|$model|$currentstatus|input`form-control`id:CMPLISTdtlsagentversion~type:text~placeholder:$version~onkeyup:CMPLISTdtlsremarksupdate(\"$version\",\"CMPLISTdtlsagentversion\")`$version";

?>
