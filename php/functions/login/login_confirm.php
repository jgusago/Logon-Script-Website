<?php
if (isset($_POST["userid"]) && isset($_POST["password"])){

    $userid = $_POST["userid"];
    $password=md5(sha1($_POST['password']));
    //$password = $_POST['password'];

    require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

    $stmt = $db->prepare("SELECT * FROM tbl_user WHERE userid=:userid LIMIT 1");
    $stmt->bindValue(':userid', $userid, PDO::PARAM_STR);
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);


    if (count($row) > 0) {
        $password = $row[0]['password']; 
        $status = $row[0]['status']; 
        $role = $row[0]['role']; 
            if($status == 'Inactive')
            {
                echo "failed:inactive";
            }
            elseif($status == 'Active' && $password) {
                $_SESSION["userid"] = $row[0]['userid']; 
                if($role == "ADMINISTRATOR")
                {
                    echo "success:admin";
                }
                else if($role == "SUPER ADMIN")
                {
                    echo "success:superadmin";
                }
                else
                {
                    echo "success:staff";
                }
            }
            else {
            echo "failed:password";
            }
    }
    else{
    echo "failed:staff"; 
    }
}
else{
    echo "failed:unkown";
}
?>
