$(document).ready(function(){
var hueList = ["showAll", "manyHue", "redHue", "greenHue", "blueHue", "cyanHue", "yellowHue", "magentaHue"];
var purityList = ["showAll", "pure", "toned", "tinted", "shaded"];
var hueBtn = $('.hueBtn');
var purityBtn = $('.purityBtn');
function slider(slideClass, slideVal){
	$('.navLinks').addClass(slideClass);
	$('.navLinks').one("webkitAnimationEnd", function(){
		$(this).removeClass(slideClass).css("transform", "translateX("+ slideVal +")");
	});
}

$('.openLinksBtn > button').click(function(){
	slider("slideRightNavLinks", "0px");
});

$('.closeLinksBtn > button').click(function(){
	slider("slideLeftNavLinks", "-400px");
});

function gradientPicker(selectedHue, selectedPurity){
	var gradientPicked = null;
	$('#canvasContainer').removeClass("showCanvas");
	$("#canvasContainer").addClass("hideCanvas");
    $('#canvasContainer').one("webkitAnimationEnd", function(){
		for(var x = 0; x < 8; ++x){
			if($(selectedHue).hasClass(hueList[x])){
				if(hueList[x] === "showAll"){
					gradientPicked = $('.canvas');
					$(gradientPicked).show();
					break;
				}
				else{
					$('.canvas').not("." + hueList[x]).hide();
					gradientPicked = $('.canvas').filter("." + hueList[x]);
					$(gradientPicked).show();
					break;
				}	
			}
			else{}
		}
		for(var x = 0; x < 5; ++x){
			if($(selectedPurity).hasClass(purityList[x])){
				if(purityList[x] === "showAll"){
					break;
				}
				else{
					$(gradientPicked).not("." + purityList[x]).hide();
					$(gradientPicked).filter("." + purityList[x]).show();
					break;
				}	
			}
			else{}
		}
		$('#canvasContainer').removeClass("hideCanvas");
		$("#canvasContainer").addClass("showCanvas");
    });
}

$(hueBtn).click(function(){
	$(hueBtn).removeClass("selectedHue");
	$(this).addClass("selectedHue");
	gradientPicker($(this), $(purityBtn).filter(".selectedPurity"));
});
$(purityBtn).click(function(){
	$(purityBtn).removeClass("selectedPurity");
	$(this).addClass("selectedPurity");
	gradientPicker($(hueBtn).filter(".selectedHue"), $(this));
});

});

