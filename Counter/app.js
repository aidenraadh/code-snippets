function copyToClipboard(id){
    const board = document.getElementById(id);
    board.select();
    document.execCommand("copy");
    alert('Code copied.');
}

$('#copyJS').click(function(){
    copyToClipboard($(this).attr('data-board-target'));
});

class Counter{
    constructor(id, stop, step, speed){
        this.el = document.getElementById(id);
        this.start = 0;
        this.stop = stop;
        this.stepVal = Math.ceil(this.stop / step);
        this.speed = (speed === undefined ? 50 : speed);

        this.el.innerHTML = this.start;
    }
    startCount(){
        const intID = setInterval(function(Counter){
            if((Counter.start + Counter.stepVal) >= Counter.stop){
                Counter.start = Counter.stop;
                Counter.el.innerHTML = Counter.stop;
                clearInterval(intID);
            }
            else{
                Counter.start += Counter.stepVal;
                Counter.el.innerHTML = Counter.start;
            }       
        }, this.speed, this);
    }
}

const counter = new Counter('number', 123, 10);

$('.startCount').click(function(){
    counter.startCount();
});

$('.reset').click(function(){
    counter.start = 0;
    counter.el.innerHTML = 0;
});
