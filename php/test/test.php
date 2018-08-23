<!DOCTYPE html>
<html>
<body>

<p>Click the button to display the hostname of the current URL.</p>

<button onclick="myFunction()">Try it</button>

<p id="demo"></p>

<script>
function myFunction() {
    var x = location.hostname;
    document.getElementById("demo").innerHTML= x;
}



</script>

<p>hostname here:  
<?php

$hn = gethostname();

$hosts = gethostbyname($hn);
print_r($hosts);

?>


<br>
<?php

if (!empty($_SERVER['HTTP_CLIENT_IP']))   
  {
    $ip_address = $_SERVER['HTTP_CLIENT_IP'];
  }
//whether ip is from proxy
elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))  
  {
    $ip_address = $_SERVER['HTTP_X_FORWARDED_FOR'];
  }
//whether ip is from remote address
else
  {
    $ip_address = $_SERVER['REMOTE_ADDR'];
  }
echo $ip_address;
?>
</p>

</body>
</html>
