$(document).ready(function(){
	//highlight links if user at the corresponding link
	$('.navbar li > a').click(function(){
		$('.navbar li > a').removeClass('active');
		$(this).addClass('active');
	});
	//open navbar items when ths button clicked
	$('.openItems').click(function(){
		$('.navbar .navItems').addClass('trans showed');
	});
	//close navbar items when ths button clicked
	$('.closeItems').click(function(){
		$('.navItems').removeClass('showed').one('transitionend', function(){
			$('.navItems').removeClass('trans');
		});
	});

});
