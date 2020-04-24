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

    constructor(carouselID, items, animDur, animTimingFunc){
        this.itemsHTML = Object.keys(items).map((index) =>
            items[index].innerHTML
        );
        this.currentItem = 0;
        this.body = document.querySelector('#'+carouselID+' .body');
        this.currentDisplay = document.querySelector('#'+carouselID+' .display');
        this.currentDisplay.innerHTML = this.itemsHTML[this.currentItem];
        this.newDisplay = null;

        this.isAnimating = false;
        this.animDur = (animDur === undefined ? 1000 : animDur);
        this.animTimingFunc = (animTimingFunc === undefined ? 'ease' : animTimingFunc);
    }

    createNewDisplay(itemTarget){
        this.newDisplay = document.createElement('div');
        this.body.insertBefore(this.newDisplay, this.currentDisplay.nextSibling);
        this.newDisplay.innerHTML = this.itemsHTML[itemTarget];
        this.newDisplay.classList.add('display');            
    }

    callback(){
        this.newDisplay.offsetHeight;
        this.currentDisplay.parentNode.removeChild(this.currentDisplay);
        this.newDisplay.removeAttribute('style');
        this.currentDisplay = this.newDisplay;
        this.isAnimating = false;
    }

    slide(DSlideVal, NDSlideVal){
        this.isAnimating = true;
        this.newDisplay.offsetHeight;
        this.newDisplay.setAttribute(
            'style',
            'transition-duration: '+this.animDur+'ms;'+
            'transition-timing-function: '+this.animTimingFunc+';'+
            'transition-property: transform;'+
            'transform: translateX('+NDSlideVal+'%);'
        );
        this.currentDisplay.setAttribute(
            'style',
            'transition-duration: '+this.animDur+'ms;'+
            'transition-timing-function: '+this.animTimingFunc+';'+
            'transition-property: transform;'+
            'transform: translateX('+DSlideVal+'%);'
        );

        this.currentDisplay.addEventListener('transitionend', this.callback.bind(this));
                            
    }

    prevItem(){
        if(!this.isAnimating){
            if(this.currentItem === 0){
                this.currentItem = this.itemsHTML.length - 1;
            }
            else{
                this.currentItem -= 1;
            }
            this.createNewDisplay(this.currentItem);
            this.newDisplay.setAttribute('style', 'transform: translateX(-200%);');
            this.slide(100, -100);
        }
    }

    nextItem(){
        if(!this.isAnimating){
            if(this.currentItem === (this.itemsHTML.length - 1)){
                this.currentItem = 0;
            }
            else{
                this.currentItem += 1;
            }
            this.createNewDisplay(this.currentItem);
            this.slide(-100, -100);
        }
    }

    goToItem(itemTarget){
        if((itemTarget !== this.currentItem) && (itemTarget >= 0 && itemTarget < this.itemsHTML.length)){
            if(!this.isAnimating){
                this.createNewDisplay(itemTarget);
                if(itemTarget < this.currentItem){
                    this.currentItem = itemTarget;
                    this.newDisplay.setAttribute('style', 'transform: translateX(-200%);');
                    this.slide(100, -100);
                }
                else{
                    this.currentItem = itemTarget;
                    this.slide(-100, -100);
                }
            }
        }
    }
}

const carousel = new Carousel(
        'testcarousel',
        document.querySelectorAll('#testcarousel .item'),
        500,
        'linear'
);

document.querySelector('.SlideCarousel.left').
addEventListener('click', function(){
    carousel.prevItem();
});

document.querySelector('.SlideCarousel.right').
addEventListener('click', function(){
    carousel.nextItem();
});