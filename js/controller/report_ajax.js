$(document).ready(function(){
	$('#from_date').datepicker();
	$('#to_date').datepicker();
	$('#btn_filter').on('click', function(){	
		if($('#from_date').val() == "" || $('#to_date').val() == ""){
			alert("Please Select Date");
		}else{
			$from_date = $('#from_date').val();
			$to_date = $('#to_date').val();
			$('#load_data').empty();
			$loader = $('<tr ><td colspan = "4"><center>Searching....</center></td></tr>');
			$loader.appendTo('#load_data');
			setTimeout(function(){
				$loader.remove();
				$.ajax({
					url: 'get_data.php',
					type: 'POST',
					data: {
						from_date: $from_date,
						to_date: $to_date
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