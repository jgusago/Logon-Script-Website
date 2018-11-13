<?php
if (isset($_POST["username"]) && isset($_POST["password"])){

    $username = $_POST["username"];
    $password = $_POST["password"];

    require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

    $stmt = $db->prepare("SELECT * FROM tbl_user WHERE userid=:userid LIMIT 1");
    $stmt->bindValue(':userid', $username, PDO::PARAM_STR);
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);


    if (count($row) > 0) {
<<<<<<< HEAD
        $hashed_password = $row[0]['password'];
        $status = $row[0]['status'];
        $role = $row[0]['role'];
            if($status == 'Inactive'){
                echo "failed:inactive";
            }
            elseif(($status == 'Active') && (password_verify($password, $hashed_password))) {
                $_SESSION["userid"] = $row[0]['userid'];
                if($role == "ADMINISTRATOR"){
=======
        $hashed_password = $row[0]['password']; 
        $status = $row[0]['status']; 
        $role = $row[0]['role']; 
            if($status == 'Inactive')
            {
                echo "failed:inactive";
            }
            elseif(($status == 'Active') && (password_verify($password, $hashed_password))) { 
                $_SESSION["userid"] = $row[0]['userid']; 
                if($role == "ADMINISTRATOR")
                {
>>>>>>> 058cb56353adb087e9eb35d3d21a1e485cf45997
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
<<<<<<< HEAD
    echo "failed:user";
=======
    echo "failed:staff"; 
>>>>>>> 058cb56353adb087e9eb35d3d21a1e485cf45997
    }
}
else{
    echo "failed:unkown";
}
?>
