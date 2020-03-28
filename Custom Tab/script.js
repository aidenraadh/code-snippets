$(document).ready(function(){

$('.tab-link').click(function(){
  var tab = '#'+this.hash.slice(1);
  $('.tab-link').attr('aria-selected', 'false').removeClass('active');
  $(this).attr('aria-selected', 'true').addClass('active');
  $('.tab-pane.show').removeClass('show').one('transitionend',function(){
    $(this).removeClass('active');
    $(tab).addClass('active');
    $(tab).addClass('show');      
  });
});
  
});
