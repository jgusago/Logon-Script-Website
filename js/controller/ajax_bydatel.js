$(document).ready(function(){
	$('#from_date2').datepicker();
	$('#to_date2').datepicker();
	//$('#btn_filter').on('click', function(){	
		$('#to_date2').on('keypress', function(e){
			if(event.keyCode==13){
		if($('#from_date2').val() == "" || $('#to_date2').val() == ""){
			alert("Please Select Date");
		}else{
			$from_date = $('#from_date2').val();
			$to_date = $('#to_date2').val();
			$('#load_datal').empty();
			$loader = $('<tr ><td colspan = "4"><center>Searching....</center></td></tr>');
			$loader.appendTo('#load_datal');
			setTimeout(function(){
				$loader.remove();
				$.ajax({
					url: 'get_datal.php',
					type: 'POST',
					data: {
						from_date: $from_date,
						to_date: $to_date
					},
					success: function(res){
						$('#load_datal').html(res);
					}
				});
			}, 3000);
		}	
	}
	});
	
	$('#reset').on('click', function(){
		location.reload();
	});
});