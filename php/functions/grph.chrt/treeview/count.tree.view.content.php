<?php
//$branch = $_POST["branch"];
//$parent = $_POST["grandparent"];

$branch = "Marvin(IT)";
$parent = "root";

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$query = "SELECT *
            FROM logonscript.tbl_tree
            WHERE treename LIKE :tree AND treeparent LIKE :parent";

$stmt = $db->prepare($query);
$stmt->bindParam(":tree",$branch);
$stmt->bindParam(":parent",$parent);
$stmt->execute();
echo $rowcount = $stmt->rowCount();
$result = $stmt->fetchAll();
echo "<br>";
if($rowcount>0){
    foreach($result as $row){
        $filter = $row["treefilter"];
        $secondquery = "SELECT *
                        FROM logonscript.tbl_log
                        WHERE hostname LIKE ? AND branch like ?
                        GROUP BY hostname
                        ORDER BY hostname";

        $sec_pdo = $db->prepare($secondquery);
        $sec_pdo->bindParam(1,$filter,PDO::PARAM_STR, 10);
        $sec_pdo->bindParam(2,$parent,PDO::PARAM_STR, 10);
        $sec_pdo->execute();
        echo $sec_rowcount = $sec_pdo->rowCount();
        $sec_result = $sec_pdo->fetchAll();

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