<?php
$branch = $_POST["branch"];
$parent = $_POST["grandparent"];

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$query = "SELECT *
            FROM logonscript.tbl_tree
            WHERE treename LIKE :tree AND treeparent LIKE :parent";

$stmt = $db->prepare($query);
$stmt->bindParam(":tree",$branch);
$stmt->bindParam(":parent",$parent);
$stmt->execute();
$rowcount = $stmt->rowCount();
$result = $stmt->fetchAll();
if($rowcount>0){
    foreach($result as $row){
        echo $filter = $row["treefilter"];
        
        $secondquery = "SELECT *
                        FROM logonscript.tbl_log
                        WHERE branch like ?
                        AND hostname like ?
                        GROUP BY hostname
                        ORDER BY hostname";

        $stmt2 = $db->prepare($secondquery);

        $stmt2->execute(array($branch,"%$filter%"));

        echo $sec_rowcount = $stmt2->rowCount();
        $sec_result = $stmt2->fetchAll(PDO::FETCH_ASSOC);
        if($sec_rowcount==0){
            //do nothing
        }
        else{
            $count = 0;

            foreach ($sec_result as $row){
                $data = $row['hostname'];

                if($count>0)
                {
                    echo '|';
                }
            
                echo $data;
            
                $count++;

            }
        }

/*
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