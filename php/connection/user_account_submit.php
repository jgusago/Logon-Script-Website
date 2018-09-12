<?php
error_reporting(0);

session_start();

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

//$username = $_POST['userid'];

/*if(!isset($error)){ 
        $stmt = $db->prepare("SELECT userid FROM tbl_user WHERE userid = :userid");
        $stmt->execute(array($username));
        $row_count = $stmt->rowCount();
        
        if ($row_count > 0){
            echo "<script>alert('Username exist!'); window.location='../../iMonitor_Website/admin_users.php'</script>";
        }
else
    {
        $sql = "INSERT INTO tbl_user (userid, name, department, position, role, password)
         
        VALUES ('".$_POST["userid"]."', '".$_POST["name"]."', '".$_POST["department"]."', '".$_POST["position"]."', '".$_POST["role"]."', '".$_POST["password2"]=md5($_POST['password'])."')";
        ($db->query($sql));
        echo "<script>alert('User Account Save Successfully!'); window.location='../../iMonitor_Website/admin_users.php'</script>";
    }
}*/
    
    $userid = $_POST['userid'];
    $name = $_POST['name'];
    $department = $_POST['department'];
    $position = $_POST['position'];
    $role = $_POST['role'];
    $password = $_POST['password2'];

    
    //encrypt password using password_hash()
    $password = password_hash($password, PASSWORD_DEFAULT);
 
    //insert new user to our database
    $stmt = $db->prepare('INSERT INTO tbl_user (userid, name, department, position, role, password) VALUES (:userid, :name, :department, :position, :role, :password2)');
    $stmt->execute(['userid' => $userid, 'name' => $name, 'department' => $department, 'position' => $position, 'role' => $role, 'password2' => $password]);
    echo "<script>alert('User Account Save Successfully!'); window.location='../../iMonitor_Website/admin_users.php'</script>";

?>