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

class Slider{
    constructor(sliderid, transDur){
        this.slider = document.getElementById(sliderid);
        this.body = document.querySelector('#'+sliderid+' > .body');
        this.pseudoBody = null;
        this.sliderItems = this.body.innerHTML;
        this.itemPos = {
            current: 0,
            first: 0,
            last: document.querySelectorAll('#'+sliderid+' .item').length - 1
        };
        this.transDur = (transDur ? transDur : '300');
        this.slide = this.slide.bind(this);
        this.newPseudoBody = this.newPseudoBody.bind(this);
        this.nextItem = this.nextItem.bind(this);
        this.prevItem = this.prevItem.bind(this);
        this.init = this.init.bind(this);
    }
    slide(body, XValue, transDur){
        this.slider.offsetHeight;
        body.setAttribute('style',
            'transition-duration: '+transDur+'ms;'+
            'transform: translateX('+(XValue * 100)+'%);'
        )
    }
    newPseudoBody(){
        let el = document.createElement('div');
        el.innerHTML = this.sliderItems;
        this.slider.appendChild(el);
        el.classList.add('body');
        this.pseudoBody = this.body;
        this.body = el;
    }
    prevItem(){
        if(this.pseudoBody !== null){
            this.pseudoBody.remove();
            this.pseudoBody = null;
            this.slide(this.body, (-1*this.itemPos.current), 0);                
        }
        if((this.itemPos.current - 1) >= this.itemPos.first){
            this.itemPos.current -= 1;
            this.slide(this.body, this.itemPos.current * -1, this.transDur);
        }else{
            this.newPseudoBody();               
            this.body.setAttribute('style',
                'transition-duration: 0;'+
                'transform: translateX('+(-1*(this.itemPos.last+2))+'00%);'
            );              
            this.slide(this.pseudoBody, 1, this.transDur);
            this.slide(this.body, -1 * (this.itemPos.last+1), this.transDur);
            this.itemPos.current = this.itemPos.last;
        }
    }       
    nextItem(){
        if(this.pseudoBody !== null){
            this.pseudoBody.remove();
            this.pseudoBody = null;
            this.slide(this.body, this.itemPos.current, 0);
        }
        if((this.itemPos.current + 1) <= this.itemPos.last){
            this.itemPos.current += 1;
            this.slide(this.body, this.itemPos.current * -1, this.transDur);
        }else{
            this.newPseudoBody();
            this.slide(this.pseudoBody, -1 * (this.itemPos.current+1), this.transDur);
            this.slide(this.body, -1, this.transDur);
            this.itemPos.current = this.itemPos.first;
        }
    }
    init(prevBtn, nextBtn){
        prevBtn.addEventListener('click', this.prevItem);           
        nextBtn.addEventListener('click', this.nextItem);
    }
}

new Slider('testslider').init(
    document.getElementById('btnprev'),
    document.getElementById('btnnext'),
);