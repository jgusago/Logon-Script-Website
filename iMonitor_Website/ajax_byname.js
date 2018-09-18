$(document).ready(function(){
	$('#user').user();
	$('#btn_search').on('click', function(){	
		if($('#user').val() == ""){
			alert("Please Select Enter Name");
		}else{
			$user = $('#user').val();
			$('#load_data').empty();
			$loader = $('<tr ><td colspan = "4"><center>Searching....</center></td></tr>');
			$loader.appendTo('#load_data');
			setTimeout(function(){
				$loader.remove();
				$.ajax({
					url: 'get_data_byname.php',
					type: 'POST',
					data: {
						user: $user
					},
					success: function(res){
						$('#load_data').html(res);
					}
				});
			}, 3000);
		}	
	});
	
	$('#reset').on('click', function(){
		location.reload();
	});
});