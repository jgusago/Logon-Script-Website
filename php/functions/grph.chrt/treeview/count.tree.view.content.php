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
        $filter = $row["treefilter"];
        
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
    }
}

?>