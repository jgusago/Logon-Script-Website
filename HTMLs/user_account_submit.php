<?php
include_once("../config/db_connection.php");

    //$username = $_POST['username'];
	//$password = md5($_POST['password']);
    //$firstname = $_POST['firstname'];
	//$middlename = $_POST['middlename'];
	//$lastname = $_POST['lastname'];
	//$company = $_POST['company'];
    //$department = $_POST['department'];
    //$accounttype = $_POST['accounttype'];

if (empty($_POST['username']))
    {
        header("Location: user_account.php?msg=wrong");
    }
    elseif (empty($_POST['password']))
    {
        header("Location: user_account.php?msg=wrong");
    }
    elseif (empty($_POST['firstname']))
    {
        header("Location: user_account.php?msg=wrong");
    }
    elseif (empty($_POST['middlename']))
    {
        header("Location: user_account.php?msg=wrong");
    }
    elseif (empty($_POST['lastname']))
    {
        header("Location: user_account.php?msg=wrong");
    }
    elseif (empty($_POST['company']))
    {
        header("Location: user_account.php?msg=wrong");
    }
    elseif (empty($_POST['department']))
    {
        header("Location: user_account.php?msg=wrong");
    }
    elseif (empty($_POST['accounttype']))
    {
        header("Location: user_account.php?msg=wrong");
    }
else
    {
        $sql = "INSERT INTO sys_users (username, password, firstname, middlename, lastname, company, department, account_type)
         
        VALUES ('".$_POST["username"]."','".$_POST["password"]=hash('sha512', $password.SALT_STRING)."','".$_POST["firstname"]."', '".$_POST["middlename"]."', '".$_POST["lastname"]."', '".$_POST["company"]."', '".$_POST["department"]."', '".$_POST["accounttype"]."')";
        ($db->query($sql));
        header("Location: user_account.php?msg=correct");
    }
//$sql = "INSERT INTO sys_users (username, password, firstname, middlename, lastname, company, department, account_type)
//VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
//$insert = $db->prepare($sql);
//$insert->execute(array($username, $password, $firstname, $middlename, $lastname, $company, $department, $accounttype));


//VALUES ('".$_POST["username"]."','".$_POST["password"]=md5($_POST['password'])."','".$_POST["firstname"]."', '".$_POST["middlename"]."', '".$_POST["lastname"]."', '".$_POST["company"]."', '".$_POST["department"]."', '".$_POST["accounttype"]."')";
//password_hash($password, PASSWORD_DEFAULT)
//hash('sha512', $password.SALT_STRING)
?>