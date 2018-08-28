<link href="./vendor/datatables/dataTables.bootstrap4.css" rel="stylesheet">
<!-- Controller Script -->
<script type="text/javascript" src="js/controller.ajax.js"></script>
<link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

<?php

require "connection.php";
date_default_timezone_set("Asia/Manila");
$currentdate = date("Y/m/j");
$datenow = date("Y/m/j h:m a");

$monthexception = strtotime ('-4 week', strtotime ($currentdate));
$monthexception = date ("Y/m/j", $monthexception);

$query = mysqli_query($con,"Select * from sky.tbl_log where date <= '$monthexception'");

?>
<!-- Breadcrumbs-->
<ol class="breadcrumb">
      <li class="breadcrumb-item">
        <a href="#">Dashboard</a>
      </li>
      <li class="breadcrumb-item active">Resolve Data Table</li>
    </ol>
    <!-- Example DataTables Card-->
        <div class="card-header border">
          <i class="fa fa-table"></i> Data Table Example</div>
        <div class="card-body border">
          <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Hostname</th>
                  <th>IP Used</th>
                  <th>Modefied Date</th>
                  <th>Status</th>
                  <th>Port</th>
                  <th>Branch</th>
                  <th>Last Scan</th>
                  <th>Date Resolved</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>User</th>
                  <th>Hostname</th>
                  <th>IP Used</th>
                  <th>Modefied Date</th>
                  <th>Status</th>
                  <th>Port</th>
                  <th>Branch</th>
                  <th>Last Scan</th>
                  <th>Date Resolved</th>
                </tr>
              </tfoot>
              <tbody id="table-data">
<?php

while ($row = mysqli_fetch_array($query)){
    $logno = $row["log_no"];
    $user = $row["user"];
    $hostname = $row["hostname"];
    $ip = $row["new_ip"];
    $ip_date = $row["new_ip_date"];
    $old_ip = $row["old_ip"];
    $old_ip_date = $row["old_ip_date"];
    $status = $row["monitoring_status"];
    $building = $row["building"];
    $date = $row["date"];

    $port = mysqli_query($con,"SELECT * FROM imonitor where hostname like '$hostname' and user like '$user'");
        
        $portcount = mysqli_num_rows($port);
        if ($portcount > 0){
        while ($row = mysqli_fetch_array($port)){
            $portid = $row["ID"];
            $portstatus = $row["connected"];
        }
        }
        else
        {
            $portid = "n\a";
            $portstatus = "unscanned";
        }
    $insertquery = "INSERT INTO sky.tbl_log_resolved (log_no, user, hostname, new_ip, new_ip_date, old_ip, old_ip_date, monitoring_status, building, date, date_resolved, port_status, id) VALUES ('$logno','$user','$hostname','$ip','$ip_date','$old_ip','$old_ip_date','$status','$building','$date','$datenow','$portstatus','$portid')";
    
    if (mysqli_query($con, $insertquery)) {



    } else {
        echo "Error: " . $insertquery . "<br>" . mysqli_error($con);
    }

    $querymovelog = "DELETE FROM sky.tbl_log WHERE log_no = '$logno'";
    if($con->query($querymovelog) === TRUE){
        //success
    }
    else{
        echo "Error moving Data Log".$con->error;
    }

    if($portstatus != "unscanned"){
        $querymoveport = "DELETE FROM sky.imonitor WHERE ID = $portid";
        if($con->query($querymoveport) === TRUE){
            //success
        }
        else{
            echo "Error Moving Port Log".$con->error;
        }
    }
    else{
        //do nothing
    }
}

echo "</div>";
$queryresolve = mysqli_query($con,"SELECT * FROM sky.tbl_log_resolved");
while($row = mysqli_fetch_array($queryresolve)){
    $ruser = $row["user"];
    $rhostname = $row["hostname"];
    $rip = $row["new_ip"]."<br>".$row["old_ip"];
    $rip_date = $row["new_ip_date"]."<br>".$row["old_ip_date"];
    $rstatus = $row["monitoring_status"];
    $rportstatus = $row["port_status"];
    $rbuilding = $row["building"];
    $rdate = $row["date"];
    $rdate_resolved = $row["date_resolved"];
    echo "<tr>
    <td>$ruser</td>
    <td>$rhostname</td>
    <td>$rip</td>
    <td>$rip_date</td>
    <td>$rstatus</td>
    <td>$rportstatus</td>
    <td>$rbuilding</td>
    <td>$rdate</td>
    <td>$rdate_resolved</td>
    </tr>";
}

mysqli_close($con);


date_default_timezone_set("Asia/Manila");
$time = date("h:i a");
?>
</tbody>
        </table>
    </div>
</div>
<div class="card-footer small text-muted border">Updated at <?php echo $time ?></div><br><br>
<!-- Page level plugin JavaScript-->
<script src="./vendor/datatables/jquery.dataTables.js"></script>
<script src="./vendor/datatables/dataTables.bootstrap4.js"></script>
<!-- Custom scripts for this page-->
<script src="./js/sb-admin-datatables.min.js"></script>