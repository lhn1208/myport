//parallax 플러그인

 (function($){
  var $window = $(window);
  $.fn.parall=function(){
    // 요소 개수 만큼 루프 돌기
    this.each(function(index){
      var $self = $(this);
      var offsetCoords = $self.offset();
      $(window).scroll(function() {
        // If this section is in view
        if (($window.scrollTop() + $window.height()) > offsetCoords.top && ((offsetCoords.top + $self.height()) > $window.scrollTop())) {
          var yPos = -($window.scrollTop() / 8);
          yPos += 0;
          var coords = '50%' + yPos + 'px';
          $self.css('backgroundPosition', coords);
        }
      });
    })
    return this;
  }
})(jQuery);

$(document).ready(function(){
  //패럴럭스
  $('.content_header').parall();

  //nav
  $('.nav_open').click(function(){
    if($(this).hasClass('is-active')){
       $(this).removeClass('is-active');
       $('#nav').stop().animate({right:'-300px'})
    }else{
       $(this).addClass('is-active');
       $('#nav').stop().animate({right:'-0'})
    }
    return false;
  })

  var $navItem= $(".nav li");
  var $section=$('section');
  var scT = $(window).scrollTop();  
  $navItem.click(function(){
     var idx=$(this).index();
    $('html, body').stop().animate({
      'scrollTop': $section.eq(idx).offset().top
    }, 800);
    return false;
  })

  //헤더 화살표
  scroll();
  function scroll(){
    $('.scroll').animate({
      bottom:'20%'
    },2000).animate({
      bottom:'10%'
    },2000, scroll);
  }

  /*hover*/
  var $items= $('.portfolio>li a');
  var $moredetail;
  $items.on('mouseenter', function(){
      $moredetail= $(this).find('.desc');
        $(this).find('>img').stop().animate({
           left:"-3%",top:"-3%",width:"106%",height:"106%"
         },300);
        $moredetail.removeClass('fadeOutDown')
        $moredetail.addClass('fadeInUp animated');
    }).on('mouseleave', function(){
        $(this).find('>img').stop().animate({
           left:"0",top:"0", width:"100%", height:"100%"
        },300);    
        $moredetail.addClass('fadeOutDown');
        $moredetail.removeClass('fadeInUp')
    }); 

  /*탑 스크롤*/  
  var $btnTop=$('.bt_top');
   $btnTop.click(function(){
      $('html, body').stop().animate({scrollTop: 0},500);
      return false;
   })
  function dpnoneTop(){
    if($(window).scrollTop()>200){
      $btnTop.fadeIn();
    }else{
      $btnTop.fadeOut();
    }
  }

  $(window).scroll(function(){
    dpnoneTop();    
  });

});