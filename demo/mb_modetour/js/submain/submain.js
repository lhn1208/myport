$(document).ready(function(){

	var $body = $('body');

	//서브메인, 상품선택 스와이퍼
	var submnNav = new Swiper('.nav-item .swiper-container', {
		slidesPerView: 'auto',
		preventClicks: true,
		preventClicksPropagation: false,
	});	

	var $navItem = $('.nav-item .swiper-slide a');
	$navItem.on('click', function(e){
		e.preventDefault();
		var $target = $(this).parent();
		$target.addClass('on').siblings().removeClass('on');
		muCenter($target);
	});

	function muCenter($target){
		var snbwrap = $target.closest('.swiper-wrapper');
		var targetPos = $target.position();
		var $bodywidth = $target.closest('.swiper-wrapper').width(); //$body.width();
		var winHalf = ( $bodywidth ) / 2;
		var pos;
		var wrapWidth=0;

		snbwrap.find('.swiper-slide').each(function(){
			wrapWidth += $(this).outerWidth();
		})
		if ((targetPos.left + $target.outerWidth()/2) <= winHalf) { // left
			pos = 0;
		}else if ((wrapWidth - targetPos.left - $target.outerWidth()/2) <= winHalf) { //right
			pos = wrapWidth - $bodywidth;
		}else {
			pos = targetPos.left - winHalf + ($target.outerWidth()/2);
		}
		
		setTimeout(function(){snbwrap.css({
			"transform": "translate3d("+ (pos*-1) +"px, 0, 0)",
			"transition-duration": "500ms"
		})}, 200);
	}

	//서브메인, 추천상품 tab 스와이퍼
	var submnRecomTab = new Swiper('.submn-recommand .tab-recom.swiper-container', {
		spaceBetween: 10,
		observer: true,
		observeParents: true,
		slidesPerView: 'auto',
		preventClicks: true,
		preventClicksPropagation: false,
	});
	//서브메인, 추천상품 con 스와이퍼
	var submnRecomCon = new Swiper('.submn-recommand .con-recom.swiper-container', {
		spaceBetween: 10,
		slidesPerView: 1.01,
		observer: true,
		observeParents: true,
	});

	//서브메인, 지금이가장좋을시기(일반리스트) 스와이퍼
	var submnList = new Swiper('.submn-list .swiper-container', {
		spaceBetween: 10,
		slidesPerView: 2.02, 
		observer: true,
		observeParents: true,
	});
	//서브메인, 홈쇼핑방영인기상품 스와이퍼
	var submnHomeshop = new Swiper('.submn-homeshop .swiper-container', {
		spaceBetween: 10,
		slidesPerView: 2,
		observer: true,
		observeParents: true,
	});
	
	//서브메인, 허니문 스와이퍼
	var submnPromotion = new Swiper('.submn-promotion .swiper-container', {
		spaceBetween: 10,
		slidesPerView: 1.65, 
		observer: true,
		observeParents: true,
	});

	//서브메인, 하단 메뉴 열기
	var $optionMenu = $body.find('.option-menu');
	$body.on('click','.pop-open', function(e){
		// e.preventDefault();
		// e.stopPropagation();
		$('.comn-header').removeClass('is-scroll-down');
	});

	//서브메인, 하단메뉴, 지역 토글
	$optionMenu.on('click','.tit a', function(e){
		e.preventDefault();
		var $tit= $(this).closest('.inner');
		if( !$tit.hasClass('is-open') ){
			$tit.addClass('is-open');
		}else{
			$tit.removeClass('is-open');
		}
	});	

	//서브메인, 하단 메뉴 열기
	var $itemSortSec = $body.find('.range-area');
	$itemSortSec.on('click', '.btn-popular', function (e) {
		e.preventDefault();
		var _this = $(this);
		if( _this.hasClass('is-open') ){
			_this.removeClass('is-open').siblings().removeClass('is-open');
		}else {
			_this.addClass('is-open').siblings().removeClass('is-open');
		}
	});	
	$itemSortSec.on('click', '.popular-wrap a', function (e) {
		e.preventDefault();
		var _this = $(this);
		var optionTxt = _this.text();
		_this.closest('.popular-wrap').find('a').removeClass('on');
		_this.addClass('on');
		_this.closest('.range-area').find('.btn-popular').text(optionTxt);
	});

	//서브메인, 인기순 레이어, 딤드영역 클릭시 닫기
	$itemSortSec.find('.pop-popular .screen').on('click', function(e){
		e.preventDefault();
		var _this = $(this);
		_this.closest('.sec-sorting').children().removeClass('is-open');
	});

});