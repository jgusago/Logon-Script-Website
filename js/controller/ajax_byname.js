$(document).ready(function(){
	$('#user').text();
	$('#btn_search').on('click', function(){	
		if($('#user').val() == ""){
			alert("Please enter name");
		}else{
			$user = $('#user').val();
			$('#load_data').empty();
			$loader = $('<tr ><td colspan = "4"><center>Searching....</center></td></tr>');
			$loader.appendTo('#load_data');
			setTimeout(function(){
				$loader.remove();
				$.ajax({
					url: '../../php/connection/get_data_byname.php',
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