<?php
$data = $_POST['data'];

$ecodeddata = base64_encode ($data);

echo "$ecodeddata";


?>