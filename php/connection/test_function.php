
    <?php
		$stmt = $db->query('SELECT * FROM tbl_user WHERE id='$id'');
		$stmt->execute();
		for($i=0; $row = $stmt->fetch(); $i++){
		$id=$row['id'];
		echo '?id='.$id;
	?>