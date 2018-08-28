<?php

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/connection.php";

header ( "Content-type: application/vnd.ms-excel" );
header ( "Content-Disposition: attachment; filename=iMonitor.xls" );

 $query = mysqli_query($con,"SELECT * FROM tbl_log");


?>
<!-- Breadcrumbs-->
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Hostname</th>
                  <th>Current IP</th>
                  <th>Date modified</th>
                  <th>Old IP</th>
                  <th>Date Last used</th>
                  <th>Status</th>
                  <th>Connection</th>
                  <th>Branch</th>
                  <th>Scan Time</th>
                  <th>Action</th>
                </tr>
              </thead>
            
                  <?php 
                  
                   while ($row = mysqli_fetch_array($query)){
        $log_num = $row['log_no'];
        $user = $row['user'];
        $hostname = $row['hostname'];
        $new_ip = $row['new_ip'];
        $new_ip_date = $row['new_ip_date'];
        $old_ip = $row['old_ip'];
        $old_ip_date = $row['old_ip_date'];
        $monitoring_status = $row['monitoring_status'];
        $building = $row['building'];
        $date = $row['date'];
        
        $port = mysqli_query($con,"SELECT * FROM imonitor where hostname like '$hostname' and user like '$user'");
        
        $portcount = mysqli_num_rows($port);
        if ($portcount > 0){
        while ($row = mysqli_fetch_array($port)){
            
            $portstatus = $row["connected"];
        }
        }
        else
        {
            $portstatus = "unscanned";
        }

        $user = str_replace (",","<br>",$user);
             
                       
        $vlan = explode(".", $new_ip);

        switch ($monitoring_status){
                
            case "null":
                $class = "<i class=\"fa fa-fw fa-question text-warning\"></i>";
            break;
            
            case "end task":
                $class = "<i class=\"fa fa-fw fa-exclamation-triangle text-danger\"></i>";
            break;
                
            case "running":
                $class = "<i class=\"fa fa-fw fa-thumbs-up text-success\"></i>";
            break;
                
            case "No monitoring":
                $class = "<i class=\"fa fa-fw fa-exclamation-triangle text-danger\"></i>";
            break;

            default:
                $class = "text-info";
                
        }

        switch ($portstatus){

          case "UNESTABLISHED": $istatus = "<i class=\"fa fa-fw fa-times text-danger\"></i>"; break;
          case "unscanned": $istatus = "<i class=\"fa fa-fw fa-question text-warning\"></i>"; break;
          case "ESTABLISHED": $istatus = "<i class=\"fa fa-fw fa-check text-success\"></i>"; break;
          default:
                $istatus = "text-info";
        }
        
              
                       
        echo "<tr id=".$hostname."><td>$user</td><td>$hostname</td><td>$new_ip</td><td>$new_ip_date</td><td>$old_ip</td><td>$old_ip_date</td><td>$class $monitoring_status</td><td>$istatus $portstatus</td><td>$building</td><td>$date</td>";
        
        
        
        echo '<td><button class="logsdata btn btn-primary btn-block btn-sm" data-value="'.$vlan[2].','.$hostname.'" )">View Logs</button></td></tr>';

    }
    mysqli_close($con);

    ?>