<?php
$username = $_POST["username"];
$password = $_POST["password"];
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$query = "SELECT * FROM logonscript.tbl_log WHERE hostname LIKE :hostname AND user not like 'admi%'";

$stmt = $db->prepare("SELECT * FROM tbl_user WHERE userid=:userid LIMIT 1");
$stmt->bindValue(':userid', $username, PDO::PARAM_STR);
$stmt->execute();
$row = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (count($row) > 0) {
    $hashed_password = $row[0]['password'];
    $status = $row[0]['status'];
    $role = $row[0]['role'];
    $name = $row[0]['name'];
    $department = $row[0]['department'];
        //if 12
        if($status == 'Inactive'){
            echo "failed:inactive";
        }
        elseif(($status == 'Active') && (password_verify($password, $hashed_password))) {
            session_start();
            $_SESSION["userid"] = $row[0]['userid'];
            $_SESSION["role"] = $role;
            $_SESSION["status"] = $status;
            $_SESSION["name"] = $name;
            $_SESSION["department"] = $department;
            //if -----
              if($role == "ADMINISTRATOR"){
                  echo "success:admin";
                }
              else if($role == "SUPER ADMIN"){
                  echo "success:superadmin";
                }
              else{
                echo "success:user";
              }
              //if -----
        }
        else {
        echo "failed:password";
        }
        //if 12
}
else{
echo "failed:user";
  }
//f (count($row) > 0)


?>
