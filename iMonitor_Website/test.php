<?php 
session_start();
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
$ID=$_GET['id'];
//if(!isset($_SESSION["userid"])) {
    //header("Location: index.php");
  //exit();
  //}
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <!-- Our Custom CSS -->
    <link rel="stylesheet" href="style2.css">
</head>
<body>
	<nav class="navbar navbar-default navbar-fixed-top" class="col-lg-12 col-md-12 col-sm-12" style="background-color: #fffafa;">
		<div class="navbar-header">
			<img class="nav-logo" src="icons/sky_luster.png">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>
       
		<!-- End of Modal -->

		<!-- Modal Add User-->


<form action="user_edit_account_submit.php <?php echo '?id='.$id; ?>" method="POST">	
	<div class="modal fade" id="editUser" tabindex="-1" role="dialog" aria-labelledby="myModallabel" arial-hidden="true" style="margin-top:150px;">
			<div class="modal-dialog modal-md" role="document">
				<div class="modal-content">
					<div class="modal-header" style="background-color:#16811430;"><b>Edit User Information</b>
						<button type="button" class="close" class="btn btn-default" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					</div>
					<div class="body">
						<form style="padding:10px;">
							<table class="modal-form">
								<tr>
									<td><b>ID Number:</b></td>
									<td><input type="number" id="userid" name="userid" value="<?php echo $row['userid']; ?>" required placeholder="User ID"></td>
								</tr>
								<tr>
									<td><b>Name:</b></td>
									<td><input type="text" pattern="[A-Za-z]*" id="name" name="name" value="<?php echo $row['name']; ?>" required placeholder="Name" class="validate"></td>
								</tr>
								<tr>
									<td><b>Department:</b></td>
									<td class="dropdown-dept">
										<select name="department">
										<option>----Select Department----</option>
											<?php     
              									$sql = "select department from tbl_department";
              									$stmt = $db->prepare($sql);
              									$stmt->execute();

              									while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                								echo '<option>'.$row['department'].'</option>'; 
              									}
            								?>
										</select>
									</td>
								</tr>
								<tr>
									<td><b>Position:</b></td>
									<td class="dropdown-dept">
										<select name="postion">
											<option>----Select Position----</option>
											<?php     
              									$sql = "select position from tbl_position";
              									$stmt = $db->prepare($sql);
              									$stmt->execute();

              									while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                								echo '<option>'.$row['position'].'</option>'; 
              									}
            								?>
										</select>
								</tr>
								<tr>
									<td><b>Role:</b></td>
									<td class="dropdown-role"> 
										<select name="role">
										<option>----Select Role----</option>
											<?php     
              									$sql = "select role from tbl_role";
              									$stmt = $db->prepare($sql);
              									$stmt->execute();

              									while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                								echo '<option>'.$row['role'].'</option>'; 
              									}
            								?>
										</select>
									</td>
                                </tr>
                                <tr class="reset-password">
                                    <td><b>Password:</b></td>
                                    <td><input id="default-pass" value="Aa123456" type="password" disabled></td> 
                                    <td>
                                        <div>
                                            <label class="checkbox-inline"><input type="checkbox" id="myCheck" onclick="resetPass()" style=" margin-left: -170px;">Reset password</label>
                                        </div>
                                    </td>
                                    <!-- <td>
                                        <input class="checkbox" type="checkbox" value="reset-pass">
                                    </td> 
                                    <td>
                                        <p>Reset password</p>
                                    </td>                 -->
                                </tr>
								<tr>
									<td></td>
									<td><button class="btn btn-primary">Update</button></td>
								</tr>
							</table>
						</form>
					</div>					
</form>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal" style="font-size:15px;">Close</button>
					</div>			
				</div>
			</div>
			</div>

		<!-- End of Modal -->

    <script type="text/javascript">
        $('#exampleModal').on('show.bs.modal', function (event) {
          var button = $(event.relatedTarget) // Button that triggered the modal
          var recipient = button.data('whatever') // Extract info from data-* attributes
          // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
          // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
          var modal = $(this)
          modal.find('.modal-title').text('New message to ' + recipient)
          modal.find('.modal-body input').val(recipient)
        })
        
        $(document).ready(function(){
         
         function load_unseen_notification(view = '')
         {
          $.ajax({
           url:"fetch.php",
           method:"POST",
           data:{view:view},
           dataType:"json",
           success:function(data)
           {
            $('.dropdown-menu').html(data.notification);
            if(data.unseen_notification > 0)
            {
             $('.count').html(data.unseen_notification);
            }
           }
          });
         }
         
         load_unseen_notification();
         
         $('#comment_form').on('submit', function(event){
          event.preventDefault();
          if($('#subject').val() != '' && $('#comment').val() != '')
          {
           var form_data = $(this).serialize();
           $.ajax({
            url:"insert.php",
            method:"POST",
            data:form_data,
            success:function(data)
            {
             $('#comment_form')[0].reset();
             load_unseen_notification();
            }
           });
          }
          else
          {
           alert("Both Fields are Required");
          }
         });
         
         $(document).on('click', '.dropdown-toggle', function(){
          $('.count').html('');
          load_unseen_notification('yes');
         });
         
         setInterval(function(){ 
          load_unseen_notification();; 
         }, 5000);
         
        });
        
          $(document).ready(function(){
            $(".dropdown").hover(            
                function() {
                    $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideDown("400");
                    $(this).toggleClass('open');        
                },
                function() {
                    $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideUp("400");
                    $(this).toggleClass('open');       
                }
            );
        });
        
                $(document).ready(function () {
                         $('#sidebarCollapse').on('click', function () {
                             $('#sidebar').toggleClass('active');
                         });
                     });
         
        
        
        function isNumber(input) {
          var regex =/[^0-9]/gi;
          input.value = input.value.replace(regex,"");
               
        }
               
        function lettersOnly(input) {
          var regex = /[^a-z]/gi;
          input.value = input.value.replace(regex,"");
               
             }   
             
         function resetPass() 
         {
            var x = document.getElementById("default-pass");
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
	
</body>
</html>

