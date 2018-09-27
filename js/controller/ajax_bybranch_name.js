$(document).ready(function(){
	$('#department').text();
		$('#department').on('change', function(){
		if($('#department').val() == ""){
			alert("Please enter name");
		}else{
				$.ajax({
					url: 'get_sub_department.php',
					type: 'POST',
					data: {
						department: $department
					},
					success: function(res){
						$('#position').html(res);
					}
				});
		}	
	});
});