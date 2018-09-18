
  <?php
		$stmt = $db->query('SELECT id, userid, name, department, position, role, status FROM tbl_user WHERE id='$id'');
		$stmt->execute();
		for($i=0; $row = $stmt->fetch(); $i++){
		$id=$row['id'];
	?>