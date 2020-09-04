$(document).ready(function(){

$('.btn-container > *').click(function(e){
	e.preventDefault();
	CodeGenerator($(this).attr('class'));
});

$('.btn-container').click(function(e){
	e.stopPropagation();
	$('.modal').toggleClass('popped');
	$('.modalContent').addClass('fadeInDown').one('animationend', function(){
		$('.modalContent').removeClass('fadeInDown');
		$('.modal').removeClass('popped');
	});
});


});
