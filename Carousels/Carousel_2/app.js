function copyToClipboard(id){
    const board = document.getElementById(id);
    board.select();
    document.execCommand("copy");
    alert('Code copied.');
}

$('#copyHTML').click(function(){
    copyToClipboard($(this).attr('data-board-target'));
});

$('#copyCSS').click(function(){
    copyToClipboard($(this).attr('data-board-target'));
});


$('#copyJS').click(function(){
    copyToClipboard($(this).attr('data-board-target'));
});

class Carousel{
	constructor(carouselID){
		this.carouselBody = document.querySelector('#'+carouselID+' .body');
		this.currentItem = 0;

		this.getDistance = this.getDistance.bind(this);
		this.slideCarousel = this.slideCarousel.bind(this);
		this.nextItem = this.nextItem.bind(this);
		this.prevItem = this.prevItem.bind(this);

		const _1stItemRect = document.querySelector('#'+carouselID+' .item.active').getBoundingClientRect();
		const bodyRect = this.carouselBody.getBoundingClientRect();
		
		this.carouselBody.setAttribute('style', 'transform: translateX('
			+((bodyRect.left + (bodyRect.width/2)) - (_1stItemRect.left + (_1stItemRect.width/2)))+
		'px);');
	}

	getDistance(targetItem){
		const bodyRect = this.carouselBody.getBoundingClientRect();
		const targetItemRect = targetItem.getBoundingClientRect();
		return (bodyRect.left + (bodyRect.width/2)) - 
		(targetItemRect.left + (targetItemRect.width/2));
	}

	slideCarousel(targetItem, prevItem){
		const slideVal = this.getDistance(targetItem);
		this.carouselBody.setAttribute(
			'style', 'transform: translateX('+slideVal+'px)'
		);
		targetItem.classList.add('active');
		prevItem.classList.remove('active');
	}

	nextItem(){
		if(this.carouselBody.children[this.currentItem+1] !== undefined){
			this.currentItem += 1;
			this.slideCarousel(
				this.carouselBody.children[this.currentItem],
				this.carouselBody.children[this.currentItem-1],
			);
		}
	}

	prevItem(){
		if(this.carouselBody.children[this.currentItem-1] !== undefined){
			this.currentItem -= 1;
			this.slideCarousel(
				this.carouselBody.children[this.currentItem],
				this.carouselBody.children[this.currentItem+1],
			);
		}
	}	
}

const carousel = new Carousel('testcarousel');

$('.SlideCarousel.left').click(function(){
	carousel.prevItem();
});

$('.SlideCarousel.right').click(function(){
	carousel.nextItem();
});

