<?php
    error_reporting(0);

    //Admin Login
    function login(){
        session_start();
        if(isset($_SESSION['user']) != ""){
            header("Location: admin_dashboard");
        }
        if(isset($_POST['login-submit'])){
            $username = mysqli_real_escape_string($db,$_POST['username']);
            $encryptedpassword = mysqli_real_escape_string($db,$_POST['password']);
            $res = mysqli_query($db,"SELECT * FROM tbl_user WHERE username = '$username' AND password = '$encryptedpassword' ");
            $row = mysqli_fetch_assoc($res);
            if($row['encryptedpassword'] == md5(sha1($encryptedpassword))){
                $_SESSION['user'] = $row['ID'];
                header("Refresh:2; URL=admin_dashboard");
            }else{
                header("Refresh:2; URL=../pages/index");
            }
        }
    }
?>