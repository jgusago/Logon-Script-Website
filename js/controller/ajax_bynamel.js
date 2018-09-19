$(document).ready(function(){
	$('#userl').text();
	//$('#btn_search').on('click', function(){	
		$('#userl').on('keypress', function(e){
			if(event.keyCode==13){
		if($('#userl').val() == ""){
			alert("Please enter name");
		}else{
			$user = $('#userl').val();
			$('#load_datal').empty();
			$loader = $('<tr ><td colspan = "4"><center>Searching....</center></td></tr>');
			$loader.appendTo('#load_datal');
			setTimeout(function(){
				$loader.remove();
				$.ajax({
					url: 'get_data_bynamel.php',
					type: 'POST',
					data: {
						user: $user
					},
					success: function(res){
						$('#load_datal').html(res);
					}
				});
			}, 3000);
		}
	}	
	});
	
	$('#resetl').on('click', function(){
		location.reload();
	});
});