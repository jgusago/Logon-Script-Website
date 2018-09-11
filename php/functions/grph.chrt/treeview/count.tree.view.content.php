<?php
$branch = $_POST["branch"];
$parent = $_POST["grandparent"];

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$query = "SELECT *
            FROM logonscript.tbl_tree
            WHERE treename=:branch AND treeparent=:parent";

$stmt = $db->prepare($query);
$stmt->array(":branch"=>$branch,
            ":parent"=>$parent);
$stmt->execute();
$rowcount = $stmt->rowCount();
$result = $stmt->fetchAll();

if($rowcount>0){

    while($result as $row){
        $filter = $row["treefilter"];
        $secondquery = "SELECT *
                        FROM logonscript.tbl_log
                        WHERE :filtering AND building like :parent
                        GROUP BY hostname
                        ORDER BY hostname";

        $sec_pdo = $db->prepare($secondquery);
        $sec_pdo->array(":filtering"=>$filter
                        ":parent"=>$parent);
        
        $sec_result = $sec_pdo->fetchAll();

        if(!($sec_result as $row)){
            //do nothing
        }
        else{
            $count = 0;

            while ($sec_result as $row){
                $data = $row['hostname'];

                if($count>0)
                {
                    echo '|';
                }
            
                echo $data;
            
                $count++;

            }
        }

        $query2 = mysqli_query($con,"select * from sky.tbl_log where $filter and building like '$parent' group by hostname order by hostname");
/*
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
            
        }*/

    }


}
/*
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

*/

?>