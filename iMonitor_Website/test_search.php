<?php 
session_start();
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
?>

<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>SKYLUSTER</title>
  
  </head>
  <body>
    <div class="container">
    <div class="banner">
    </div>
    
    <div class="mainbody">
      
    <div class="content">
      <center>
        <h3><p>Search</p></h3>
      </center>  
    					<div>
						<div class="col-md-3">
                            <input type="text" id="from_date" name="from_date" class="form-control" placeholder="From Date"> 
                        </div>
                        <div class="col-md-3">
                            <input type="text" id="to_date" name="to_date" class="form-control" placeholder="To Date"> 
                        </div>
	<input type="button" id="btn_filter" name="btn_filter"  value="Filter" class="btn btn-success">   
    </div>  

 							<div style="clear:both; padding:15px;">
                            <table class="table table-bordered" id="comp_logs">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>User</th>
                                    <th>Computer Name</th>
                                    <th>Domain</th>
                                    <th>IP Address</th>
                                    <th>Date Modified</th>
                                    <th>Old IP Address</th>
                                    <th>Date Modified</th>
                                    <th>iMonitor Status</th>
                                    <th>Services Not Found</th>
                                    <th>SysSetting File</th>
                                    <th>Server IP</th>
                                    <th>Connection Status</th>
                                    <th>Branch</th>
                                    <th>Scan Time</th>
                                </tr>
                                </thead>
                                <tbody id = "load_data">
                                    <?php
                                       $sql = "select user, domain_name, hostname, ip_address, ip_date_modified, old_ip_address, old_ip_modified, 
                                       iMonitor_Status, services, sysSetting_File, serverIP, connection_status, branch, scan_time from tbl_log 
                                       WHERE user != 'Administrator' ";
                                       $stmt = $db->prepare($sql);
                                       $stmt->execute();
                                       $count = 1;
                                       foreach($stmt as $row) {
                                       //while($row=$stmt->fetch(PDO::FETCH_ASSOC)) {
	            	                 ?>
                                <tr> 
                                    <td><?php echo $count++ ?></td>
                                    <td><?php echo $row['user']; ?></td>
                                    <td><?php echo $row['domain_name']; ?></td>
                                    <td><?php echo $row['hostname']; ?></td>
                                    <td><?php echo $row['ip_address']; ?></td>
                                    <td><?php echo $row['ip_date_modified']; ?></td>
                                    <td><?php echo $row['old_ip_address']; ?></td>
                                    <td><?php echo $row['old_ip_modified']; ?></td>
                                    <td><?php echo $row['iMonitor_Status']; ?></td>
                                    <td><?php echo $row['services']; ?></td>
                                    <td><?php echo $row['sysSetting_File']; ?></td>
                                    <td><?php echo $row['serverIP']; ?></td>
                                    <td><?php echo $row['connection_status']?></td>
                                    <td><?php echo $row['branch']; ?></td>
                                    <td><?php echo date("m/d/Y", strtotime($row['scan_time'])) ?></td>
                                </tr>
                                <?php } ?>
                                </tbody>
                            </table>
                        </div>

    </div>                                  
    </div>           
    <div class="footer">
    </div>
    </div>
  </body>
</html>
