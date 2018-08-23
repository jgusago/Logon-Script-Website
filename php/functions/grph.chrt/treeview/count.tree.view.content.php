<?php

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/connection.php";

$branch = $_POST["branch"];

$query = mysqli_query($con,"select * from sky.tbl_treeview where treename='$branch'");

if(mysqli_num_rows($query)>0){

    while ($row = mysqli_fetch_array($query)){

        $filter = $row["treefilter"];
        $query2 = mysqli_query($con,"select * from sky.tbl_log where $filter group by hostname order by hostname");

        if(!$query2){
            //do nothing
        }
        
        else{
            $count = 0;
            //print content
            while ($row = mysqli_fetch_array($query2)){
                $data = $row['hostname'];
            
                if($count>0)
                {
                    echo '|';
                }
            
                echo $data;
            
                $count++;
            }
        }
    
    }
}





?>