$(document).ready(function(){
	$('#date1').datepicker();
	$('#date2').datepicker();
	$('#btn_search').on('click', function(){	
		if($('#date1').val() == "" || $('#date2').val() == ""){
			alert("Please enter something on the text field");
		}else{
			$date1 = $('#date1').val();
			$date2 = $('#date2').val();
			$('#load_data').empty();
			$loader = $('<tr ><td colspan = "4"><center>Searching....</center></td></tr>');
			$loader.appendTo('#load_data');
			setTimeout(function(){
				$loader.remove();
				$.ajax({
					url: 'get_data.php',
					type: 'POST',
					data: {
						date1: $date1,
						date2: $date2
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