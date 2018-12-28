<?php
$hostname = $_POST["hostname"];
//$hostname = "AEITOM073137";
$count = 0;
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
//Connection

/*
echo "Computer Name|User ID|Domain|IP Address|Services Status|Server Status|Branch|Scan Time";
*/
  echo "Agent Version";

  $newquery = "SELECT * FROM logonscript.tbl_computer_details WHERE hostname LIKE :hostname GROUP BY hostname";

  $newpdo = $db->prepare($newquery);
  $newpdo->bindParam(":hostname",$hostname);
  $newpdo->execute();
  $newresult = $newpdo->fetchAll();

  if (count($newresult) != 0){
    foreach ($newresult as $row) {
      if(empty($row['agent_version']))
      {
        $row['agent_version'] = "";
      }
      if(empty($row['remarks']))
      {
        $row['remarks'] = "";
      }
      $version = $row['agent_version'];
      $remarks = $row['remarks'];
      //echo "#$processor|$serial|$macaddress|$manufacturer|$model|$status|input`form-control`id:agentversion~type:text~placeholder:$version~onkeypress:remarksupdate(\"$version\")`$version";
    }
  }
  else{
      $version = "No Data Found";
  }


echo "#input`form-control`id:CMPLISTdtlsagentversion~type:text~placeholder:$version~onkeyup:CMPLISTdtlsremarksupdate(\"$version\",\"CMPLISTdtlsagentversion\")`$version";
echo "#$remarks";
?>
