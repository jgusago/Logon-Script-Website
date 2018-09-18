$(document).ready(function(){
	$('#from_date').datepicker();
	$('#to_date').datepicker();
	$('#btn_search').on('click', function(){	
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
					url: 'load_data.php',
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