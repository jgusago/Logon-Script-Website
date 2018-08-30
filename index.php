

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Skyluster Technology Inc</title>
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <style>
    body
    {
        background-color:#dff5bc;
    }
    .header
	{
        /* border-radius:15px; 
        background-color:#16811430; 
        padding: 30px 60px; 
        width: 700px; 
        height: 300px; 
        top:120%;
        left:50%;	
        position: absolute;
        margin-top:-690px;
        margin-left:-350px;
        overflow: hidden; */

        border-radius:15px; 
		background-color:#16811430; 
		padding: 30px 60px; 
		width: 700px; 
		height: 300px; 
		top:50%;
		left:50%;	
		position: absolute;
		margin-top:-150px;
		margin-left:-350px;
		overflow: hidden;
    }
    .container
    {
        margin-top:auto;
        display:block;
        margin-bottom: auto;
        position: relative;
    }
    .row
    {
        margin-right: -75px;
        margin-left: -70px;
    }
    .header input 
    {
        width: 30%;
        height: 40px;
        margin-bottom: 20px;
        margin-right:100px;
        font-family: Century Gothic;
    } 
    img
	{
		height:750px; 
		width:670px; 
		display:block; 
		margin-left:auto; 
		margin-right:auto;
    }
    h1
	{
		padding-top:-30px;
		font-family: Verdana;
		color: #5B3D3D;
		text-align: center;
		font-size: 40px;
		margin-top: -20px;
	}
    </style>
</head>
<body>
    <div class="container">
        <img alt="logo" src="icons/sky_luster.png">
        <div class="header">
       
          <form action=".superadmin.html" method="POST">
            <div class="row>
				<div class="col-sm-12 col-md-10  col-md-offset-1">
					<div class="form-group">
						<div class="input-group" style="width: 80%;margin-top: 45px;margin-left: 50px;">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span> 
							<input class="form-control" placeholder="Username" name="username" type="text" style="text-align: center;">
						</div>
					</div>
					<div class="form-group">
						<div class="input-group"  style="width: 80%;margin-left: 50px;">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-lock"></i>
							</span>
							<input class="form-control" placeholder="Password" name="password" type="password" value="" style="text-align: center;">
						</div>
					</div>
					<div>
						<button type="submit" class="btn btn-primary btn-block" value="Login" style="width:80%; height:40px; border-radius: 3px; margin-top:30px;margin-left:50px;">Login</button>
					</div>
				</div>
			</div>
        </div>
        </form>
        <h1><strong>SKYLUSTER TECHNOLOGY INC</strong></h1>
    </div>

    <script src="Bootstrap/js/jquery.min.js"></script>
    <script src="Bootstrap/js/bootstrap.min.js"></script>

</body>
</html>