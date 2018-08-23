<?php

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/connection.php";

$hostname = $_POST["host"];
//$hostname = "L8TSPH001";
$count = 0;

echo "User|BIOS|Motherboard|Ram|OS|osArch|Processor|Core|Mac Address| hostname = $hostname";


$query = mysqli_query($con, "SELECT * from sky.tbl_computer_details where hostname like '$hostname' group by hostname");

while($row = mysqli_fetch_array($query)){
    $compno = $row['computer_no'];
    $user = $row['user'];
    $bios = $row['bios'];
    $mb = $row['motherboard'];
    $ram = $row['ram'];
    $os = $row['os'];
    $arch = $row['osArch'];
    $pross = $row['processor'];
    $core = $row['procCore'];
    $mac = $row['mac_address'];


    $ramro = round($ram,-9);
    $ramro = str_replace('0','',$ramro);
    echo "#$user|$bios|$mb|$ramro Gb ($ram Bytes)|$os|$arch|$pross|$core|$mac|$compno";

    $count++;
}
?>