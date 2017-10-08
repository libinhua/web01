$(function(){
	$('.roleTable').on('click','.pull-right-container',function(){
		alert($(this));
		$(this).siblings().slideToggle();
	})
})