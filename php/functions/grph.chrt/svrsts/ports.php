 
<?php 
//SQL Connection
require "C:/xampp/htdocs/om3/php/connection/connection.php";
//Page Variables 
    $online='<td style="background-color:#00FF00; padding:5px;">Online</td>'; 
    $offline='<td style="background-color:#FF0000; padding:5px;">Offline</td>'; 
//Functions 
    function servercheck($server,$port){ 
        //Check that the port value is not empty 
        if(empty($port)){ 
            $port=80; 
        } 
        //Check that the server value is not empty 
        if(empty($server)){ 
            $server='localhost'; 
        } 
        //Connection 
        $fp=@fsockopen($server, $port, $errno, $errstr, 1); 
            //Check if connection is present 
            if($fp){ 
                //Return Alive 
                return 1; 
            } else{ 
                //Return Dead 
                return 0; 
            } 
        //Close Connection 
        fclose($fp); 
    } 
//Ports and Services to check 
$services=array( 
    'HTTP (Port 80)' => array('172.16.39.241' => 80), 
    'HTTPS (Port 443)' => array('172.16.39.241' => 443), 
    'MySQL (Port 3306)' => array('172.16.39.241' => 3306),
    'Internet (Port 80)' => array('172.16.39.241' => 80),
); 

//$server_lst= mysqli_query($con,"SELECT * FROM tbl_server");

//Database Serverlist to Ports and Services to check
//$loop = 0; 
/*while ($row = mysqli_fetch_array($server_lst)){
    $server_name[0] = $row['server_name'];
    $server_ip = $row['server_ip'];

    $arr1 = array($server_ip => 80);
    $arr2 = 'Server' => array($server_ip => 80);

    array_push($services, 'Server' => array($server_ip => 80));


    //array_push($services, slug($server_name) => array(slug($server_ip => 80)) );

   

}
*/


?> 
<table> 
<?php 
//Check All Services 
foreach($services as $name => $server){ 
?> 
    <tr> 
    <td><?php echo $name; ?></td> 
<?php 
    foreach($server as $host => $port){ 
        if(servercheck($host,$port)){ echo $online; }else{ echo $offline; } 
    } 
    //echo "$server_ip $server_name";
?> 
    </tr> 

<?php 
}
?> 

</table>