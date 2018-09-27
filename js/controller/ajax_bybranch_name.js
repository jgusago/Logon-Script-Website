$(document).on('change','#department',function(){
	var val = $(this).val();
	$.ajax({
		  url: 'get_sub_department.php',
		  data: {distrito:val},
		  type: 'POST',
		  dataType: 'html',
		  success: function(result){
			   $('#position').html();  
			   $('#position').html(result); 
		  }
	 });
});