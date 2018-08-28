<?php

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/connection.php";

$branch = $_POST["branch"];
$parent = $_POST["grandparent"];

$query = mysqli_query($con,"select * from sky.tbl_treeview where treename='$branch' and treeparent='$parent'");

if(mysqli_num_rows($query)>0){

    while ($row = mysqli_fetch_array($query)){

        $filter = $row["treefilter"];
        $query2 = mysqli_query($con,"select * from sky.tbl_log where $filter and building like '$parent' group by hostname order by hostname");

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

mysqli_close($con);



?>