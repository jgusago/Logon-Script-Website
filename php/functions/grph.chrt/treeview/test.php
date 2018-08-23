<?php

require "{$_SERVER['DOCUMENT_ROOT']}/om3/php/connection/connection.php";

$branch = "ul";

$query = mysqli_query($con,"select * from sky.tbl_treeview where treename='$branch'");

$count = 0;
    while ($row = mysqli_fetch_array($query)){

        $filter = $row["treefilter"];

        $query2 = mysqli_query($con,"select * from sky.tbl_log where $filter");

        if($query2 === true){
            
            
            while ($row = mysqli_fetch_array($query2)){
                $data = $row['hostname'];
            
                if($count>0)
                {
                    $output = $output.'|'.$data;
                }
                else{
                $output = $data;
                }
                $count++;
            }

        }
    }

    if($count>0){

        echo $output;

    }
    else{
        echo $count;
    }

    echo $filter."<br>";

?>