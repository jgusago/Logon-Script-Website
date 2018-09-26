
 <div class="modal fade" id="edit_<?php echo $row['id']; ?>" tabindex="-1" role="dialog" aria-labelledby="myModallabel" arial-hidden="true" style="margin-top:150px;">
 	<div class="modal-dialog modal-md" role="document">
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Edit User Information</h4>
        </div>
        <div class="modal-body">
				<div class="container-fluid">
        <form style="padding:10px;">
							<table class="modal-form">
								<tr>
									<td><b>ID Number:</b></td>
									<td><input type="text" id="userid" value=<?php echo $row['userid']?> name="userid" required placeholder="User ID"></td>
								</tr>
								<tr>
									<td><b>Name:</b></td>
									<td><input type="text" id="name" name="name" value=<?php echo $row['name']?>  required  class="validate"></td>
								</tr>
								<tr>
									<td><b>Department:</b></td>
									<td class="dropdown-dept">
										<select name="department">
										<option value=<?php echo $row['userid']?>> <?php echo $row['department']?> </option>
										</select>
									</td>
								</tr>
								<tr>
									<td><b>Position:</b></td>
									<td class="dropdown-dept">
										<select name="position">
										<option value=<?php echo $row['userid']?> > <?php echo $row['position']?> </option>
										</select>
								</tr>
								<tr>
									<td><b>Role:</b></td>
									<td class="dropdown-role"> 
										<select name="role">
										<option value=<?php echo $row['userid']?>> <?php echo $row['role']?> </option>
										</select>
									</td>
                </tr>
                <tr class="reset-password">
                  <td><b>Password:</b></td>
                  <td><input id="default-pass" type="password" value="Aa123456"></td></br>
									<td>
                      <label class="checkbox-inline"><input type="checkbox" id="myCheck" onclick="resetPass()" style=" margin-left: -170px;">Reset password</label>
                  </td>
                </tr>
								<tr>
									<td></td>
									<td><button class="btn btn-primary">Update</button></td>
								</tr>
							</table>
						</form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
	   </div>  
    </div>
  </div>
