<?php
    
    echo '<div>
  <!-- Bootstrap core CSS-->
  <link href="./vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <!-- Custom fonts for this template-->
  <link href="./vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
  <!-- Page level plugin CSS-->
  <link href="./vendor/datatables/dataTables.bootstrap4.css" rel="stylesheet">
  <!-- Custom styles for this template-->
  <link href="./css/sb-admin.css" rel="stylesheet">
    
  <script type="text/javascript" src="./js/controller.ajax.js"></script>
  <script type="text/javascript" src="./js/jquery-2.1.4.min.js"></script>

';
    

require 'connection.php';
    $usercount = 1;
    $query = mysqli_query($con,"SELECT *, group_concat(user) FROM tbl_log GROUP BY new_ip");


echo 
    '
  <div class="container-fluid">
    <!-- Breadcrumbs-->
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <a href="#">Dashboard</a>
      </li>
      <li class="breadcrumb-item active">Tables</li>
    </ol>
    <!-- Example DataTables Card-->
        <div class="card-header">
          <i class="fa fa-table"></i> Data Table Example</div>
        <div class="card-body">
          <div class="table-responsive">
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
              <tfoot>
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
              </tfoot>
              <tbody id="table-data">
                  ';
                  
                   while ($row = mysqli_fetch_array($query)){
        $user = $row['group_concat(user)'];
        $hostname = $row['hostname'];
        $new_ip = $row['new_ip'];
        $new_ip_date = $row['new_ip_date'];
        $old_ip = $row['old_ip'];
        $old_ip_date = $row['old_ip_date'];
        $monitoring_status = $row['monitoring_status'];
        $building = $row['building'];
        $date = $row['date'];
        
        $port = mysqli_query($con,"SELECT * FROM imonitor where hostname like '$hostname'");
        
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
             
                       
        $vlan = explode(".", $new_ip);

        switch ($monitoring_status){
                
            case "null":
                $class = "text-warning";
            break;
            
            case "end task":
                $class = "text-danger";
            break;
                
            case "running":
                $class = "text-success";
            break;
                
            case "No monitoring":
                $class = "text-danger";
            break;

            default:
                $class = "text-info";
                
        }
        
                       
                       
        echo "<tr><td >$user</td><td>$hostname</td><td>$new_ip</td><td>$new_ip_date</td><td>$old_ip</td><td>$old_ip_date</td><td>$monitoring_status</td><td>$portstatus</td><td>$building</td><td>$date</td>
        
        
        
        <td><div></div><button onClick=\"logview('$vlan[2]','$hostname')\">View Logs</button></td></div>
        

        
        </tr>";
        
        $usercount++;
    }
                  
                  date_default_timezone_set("Asia/Manila");
                  $time = date("h:i a");
                  
                 echo '
              </tbody>
            </table>
          </div>
        </div>
        <div class="card-footer small text-muted">Updated at '.$time.'</div>

    
    <!-- /.container-fluid-->
    <!-- /.content-wrapper-->
    
    <!-- Scroll to Top Button-->
    <!-- Logout Modal-->
   
    <!-- Bootstrap core JavaScript-->
    <script src="./vendor/jquery/jquery.min.js"></script>
    <script src="./vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <!-- Core plugin JavaScript-->
    <script src="./vendor/jquery-easing/jquery.easing.min.js"></script>
    <!-- Page level plugin JavaScript-->
    <script src="./vendor/datatables/jquery.dataTables.js"></script>
    <script src="./vendor/datatables/dataTables.bootstrap4.js"></script>
    <!-- Custom scripts for all pages-->
    <script src="./js/sb-admin.min.js"></script>
    <!-- Custom scripts for this page-->
    <script src="./js/sb-admin-datatables.min.js"></script>
    <!-- Controller Script -->
    <script type="text/javascript" src="./js/controller.ajax.js"></script>
    </div>
';
    
    ?>