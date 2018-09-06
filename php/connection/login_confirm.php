<?php

$username = $_POST["username"];
$password = $_POST["password"];
$ecpassword =  md5(sha1($password));

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

$query = ("SELECT * FROM user WHERE username = '$username' and passwordHash = '$ecpassword'");






while ($row = mysqli_fetch_array($query)){
	$id = $row["iduser"];
	$firstname = $row["firstname"];
	$lastname = $row["lastname"];
	$status = $row["status"];
	$loginpasschange = $row["loginpasschange"];
	$active = $row["active"];

}
mysqli_close($con);
//Error or Fail
if($qcount == 1){

	if($active == 1){
		if($loginpasschange != 1){
			session_start();
			$_SESSION['id'] = $id;
		}

	//Format: [success/failed];[admin/itstaff/error];[active/diactivated];[loginpasschange];[firstname];[lastname]
	echo "success;$status;$active;$loginpasschange";
	}
	else{
		echo "failed;Account is Deactived";
	}
}
else{
	echo "failed;Login Failed: Please check your login and try again";
}

?>