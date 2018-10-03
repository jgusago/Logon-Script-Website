<!-- Edit User Modal -->
<form action="../php/connection/user_edit_account_submit.php <?php echo '?id='.$id; ?>" method="POST">
    <div class="modal fade" id="edit_<?php echo $row['id']; ?>" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" arial-hidden="true" style="margin-top:50px;">
		<div class="modal-dialog modal-md" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" class="btn btn-default" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="myModalLabel">Edit User Information</h4>
				</div>

				<div class="modal-body1" style="height: 570px;">
					<form class="form-horizontal" role="form">
						<div class="form-group">
							<label class="col-sm-12 control-label" for="userID">ID Number</label>
							<div class="col-sm-12">
								<input type="text" class="form-control" id="userid" name="userid" value="<?php echo $row['userid']; ?>" pattern="[0-9]{7}" placeholder="ID Number" required onkeypress="return isNumberKey(event)"/>

								<script type="text/javascript">
									function isNumberKey(evt)
									{
										var charCode = (evt.which) ? evt.which : evt.keyCode;
										if (charCode > 31 && (charCode < 48 || charCode > 57))
											return false;
											return true;
									}
								</script>
							</div>
						</div>
						<br>
						<div class="form-group">
							<label class="col-sm-12 control-label" for="Name">Name</label>
							<div class="col-sm-12">
								<input type="text" class="form-control" id="name" name="name" value=<?php echo $row['name']?> required placeholder="Name" onkeypress="return LettersrOnly(this, event)" maxlength="30"/>
							</div>

								<script type="text/javascript">
									function LettersrOnly(txt, e) 
									{
            							var arr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ";
            							var code;
            							if (window.event)
										code = e.keyCode;
										else
                						code = e.which;
            							var char = keychar = String.fromCharCode(code);
            							if (arr.indexOf(char) == -1)
                							return false;
        							}
    							</script>

						</div>
						<br>
						<div class="form-group">
							<label class="col-sm-12 control-label" for="department">Department</label>
							<div class="col-sm-12">
								<select class="form-control" id="dept" name="department" required>

										

										<?php     
              								$sql = "select DISTINCT branch_name from tbl_department ORDER BY branch_name ASC";
              								$stmt = $db->prepare($sql);
              								$stmt->execute();

											  	while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                								echo '<option>'.$row['branch_name'].'</option>'; 
              									}
            							?>
								</select>
							</div>
						</div>
						<br>
						<div class="form-group">
							<label class="col-sm-12 control-label" for="position">Position</label>
							<div class="col-sm-12">
								<select class="form-control" id="postn" name="position" required>
								
										
								</select>
							</div>
						</div>
						<br>
						<div class="form-group">
							<label class="col-sm-12 control-label" for="role">Role</label>
							<div class="col-sm-12">
								<select class="form-control" name="role" id="roles" required>
										<?php     
              								$sql = "select role from tbl_user WHERE id='$id'";
              								$stmt = $db->prepare($sql);
              								$stmt->execute();

              								while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                							echo '<option>'.$row['role'].'</option>'; 
              								}
            							?>

									<option value="Adminsitrator">Administrator</option>
									<option value="Staff">Staff</option>
								</select>
							</div>
						</div>
						<br>
						<div class="form-group">
							<label class="col-sm-12 control-label" for="status">Status</label>
							<div class="col-sm-12">
								<select class="form-control" name="status" id="statuss" required>
										
													<?php     
              								$sql = "select status from tbl_user WHERE id='$id'";
              								$stmt = $db->prepare($sql);
              								$stmt->execute();

              								while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                							echo '<option>'.$row['status'].'</option>'; 
              								}
            							?>

										<option value="Active">Active</option>
										<option value="Inactive">Inactive</option>
								</select>
							</div>
						</div>
						<br>
						<div class="form-group">
							<label class="col-sm-12 control-label" for="password">Password</label>
							<div class="col-sm-12">
								<input class="form-control" type="password" id="myCheck"  value="Aa123456" name="password" disabled>
							</div>
						</div>
						<br>
						<div class="form-group">
							<div class="col-sm-12">
								<div class="checkbox">
									<label><input type="checkbox" onclick="resetPass()"/>Reset password</label>
								</div>
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-12">
								<button type="submit" class="btn btn-warning" style="margin: auto; margin-top: 5px;">Update</button>
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<input type="hidden" id="password2" name="password2" value="Aa123456">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
</form>

<script type="text/javascript">
	$("#dept").change(function() {
  	$("#postn").load("get_sub_department2.php?branch_name=" + $("#dept").val());
	});
</script>


<script>
	function resetPass() 
		{
			var x = document.getElementById("myCheck");
			if (x.type === "password")
				{
					x.type = "text";
				} 
			else 
				{
					x.type = "password";
				}
			}  
</script>