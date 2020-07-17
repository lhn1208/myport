$(document).ready(function(){

	var $window = $(window);
	var $body = $('body');
	
	//맞춤단체여행, 메인, 모두투어 맞춤단체(단독)여행
	var benefitSwiper = new Swiper('.sec-benefit .swiper-container', { 
		slidesPerView: 2.1,
		spaceBetween: 10,
	});
	//맞춤단체여행, 메인, 배너이미지
	var banrSwiper = new Swiper('.sec-banr .swiper-container', { 
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets'
		},
	});
	//맞춤단체여행, 메인, 모두투어 맞춤단체(단독)여행 REVIEW
	var reviewBottomSwiper = new Swiper('.sec-review .review-text.swiper-container', { 
		slidesPerView: 1.1,
		spaceBetween: 15,
		observer: true,
		observeParents: true,
		thumbs: {
			swiper: reviewThumbsSwiper
		}
	});
	var reviewThumbsSwiper = new Swiper('.sec-review .review-tab.swiper-container', {
		slidesPerView: 'auto',
		centeredSlides: true,
		loop: true,
		on: {
			touchEnd: function () {
				var idx = reviewThumbsSwiper.activeIndex;
				$('.sec-review li').eq(idx).find('a').trigger('click');
				reviewThumbsSwiper.update(); //업데이트 후, 처음상태로 로딩
			},
		},
	});
	reviewThumbsSwiper.update();//업데이트 후, 처음상태로 로딩
	$('.sec-review .review-tab li a').on('click', function(e) {
		e.preventDefault();
		var idx = $(this).parent().index();
		reviewThumbsSwiper.slideTo(idx,100,false);
		reviewThumbsSwiper.update();//업데이트 후, 처음상태로 로딩
	});
	//맞춤단체여행, 리뷰, 더보기
	$('.sec-review .review-text li a').on('click', function(e) {
		e.preventDefault();
		var _this = $(this).parent('li');
		if(!_this.hasClass('is-open')) {
			_this.addClass('is-open');
		}else {
			_this.removeClass('is-open');
		}
	});


	//맞춤단체여행, 메인/검색결과/실시간 베스트, 날짜선택
	var $optionMenu = $body.find('.option-menu');
	$optionMenu.on('click','.tb-calen a', function(e){
		e.preventDefault();
		e.stopPropagation();
		if( !$(this).hasClass('is-selected') ){
			$('.calen-wrap .tb-calen a').removeClass('is-selected');
			$(this).addClass('is-selected');
		}else{
			$(this).removeClass('is-selected');
		}
	});	
	//맞춤단체여행, 달력 스크롤이동
	$('.grouptour-content').on('click', '.btn-find, .btn-area .pop-open', function (e) {
		$('.calen-wrap .calendar').each(function(i, el){
			var _this = $(this);
			var thisMonth = $(this).find('.is-selected').closest('.tb-calen').attr('data-month');
			var currentMonth  = $(this).find('.tb-calen').attr('data-month');
			if( thisMonth == currentMonth ) {
				setTimeout(scollMove, 0)
				function scollMove(){
					var thisMonthPos =  $('.is-selected').closest('.tb-calen').position().top - $('.caren-tit').outerHeight();
					$optionMenu.find('.pop-con').animate({scrollTop:thisMonthPos}, 700);
				}
			}
		});
	});
	

	//맞춤단체여행, 검색결과, 인기순 레이어 show/hide
	var $itemResult = $body.find('.item-result');
	var $itemSortSec = $body.find('.sec-sorting');
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
	//맞춤단체여행, 검색결과, 인기순 레이어, 딤드영역 클릭시 닫기
	$itemSortSec.find('.pop-popular .screen').on('click', function(e){
		e.preventDefault();
		var _this = $(this);
		_this.closest('.sec-sorting').children().removeClass('is-open');
	});
	//맞춤단체여행, 검색결과, 워드 삭제
	$itemResult.find('.word-area').on('click', '.btn-remove', function (e) {
		e.preventDefault();
		var _this = $(this);
		_this.hide();
	});
	//맞춤단체여행, 검색결과, 워드 swiper
	var wordSwiper = new Swiper('.sec-result .swiper-container', { 
		slidesPerView: 'auto',
		spaceBetween: 5
	});

});