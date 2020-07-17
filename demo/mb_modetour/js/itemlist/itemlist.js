$(document).ready(function(){

	var $body = $('body');
	var $itemConList = $body.find('.item-content-list');

	//상품리스트, 여행요금 슬라이더
	var $slider = $("#slider-range");
	var $filterAmount = $( "#filter_amount" );
	if( $slider.length > 0) {
		$slider.slider({
			range: true,
			min: 499000,
			max: 1459000,
			values: [ 499000 , 1459000 ],
			slide: function( event, ui ) {
				$filterAmount.val( ui.values[ 0 ] + " ㅡ " + ui.values[ 1 ] );
			}
		});
		$filterAmount.val( $slider.slider( "values", 0 ) + " ㅡ " + $slider.slider( "values", 1 ) );	

		//상품리스트, 초기화 버튼 눌렀을때 여행요금 슬라이더 초기화
		$itemConList.on('click', '.btn-reset', function(){
			$slider.slider("values", 0, $slider.slider( 'option' ).min);
			$slider.slider("values", 1, $slider.slider( 'option' ).max);
		});
	}

	//상품리스트, 호텔항공가이드편지필수경비쇼핑횟수 토글
	$body.find('.item-content-list, .fav-content-list').on('click', '.hash', function(e){
		e.preventDefault();
		var _this = $(this);
		if( !_this.hasClass('is-open') ){
			_this.addClass('is-open');
		}else {
			_this.removeClass('is-open');
		}
	});
	$body.find('.item-content-list .hash, .fav-content-list .hash').each(function(){ 
		$(this).addClass('is-open');
		if( $(this).height() <= 18 ){
			$(this).addClass('nomore');
		}
		$(this).removeClass('is-open');
	});

	//상품리스트, 더보기/접기 토글
	$itemConList.on('click', '.btn-more', function(e){
		e.preventDefault();
		var _this = $(this);
		if( !_this.hasClass('is-open') ){
			_this.addClass('is-open').text("접기");

		}else {
			_this.removeClass('is-open').text("더보기");
		}
	});
	//상품리스트, 이런상품 어때요? 1개일때 버튼 미노출
	if( $itemConList.find('.lst-mdpick li').length <= 1) {
		$itemConList.find('.btn-more').remove();
	}

	//상품리스트, 요즘뜨는 상품(연령대 인기상품)
	$itemConList.find('.lst-pack').on("click",'.fav', function (e) {
		e.preventDefault();
		var _this = $(this);
		if( !_this.hasClass('on') ){
			_this.addClass('on');
		}else {
			_this.removeClass('on');
		}
	});

	//상품리스트, 옵션 메뉴 열기
	var $optionMenu = $itemConList.find('.option-menu');
	$itemConList.on('click','.pop-open', function(e){
		$('.comn-header').removeClass('is-scroll-down');
	});

	//상품리스트, 옵션 토글
	$optionMenu.on('click','.tit a', function(e){
		e.preventDefault();
		var $tit= $(this).closest('.inner');
		if( !$tit.hasClass('is-open') ){
			$tit.addClass('is-open');
		}else{
			$tit.removeClass('is-open');
		}
	});
	//상품리스트, 옵션 날짜선택
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

	var $itemResult = $itemConList.find('.item-result');
	var $itemSortSec = $itemConList.find('.sec-sorting');

   //상품리스트, 리스트형/섬네일형 토글
	$itemSortSec.on('click', '.btn-change', function (e) {
		e.preventDefault();
		var _this = $(this);
		var $listPack = $itemResult.find('.lst-pack');
		if( !$listPack.hasClass('view-thumb') ){
			$listPack.addClass('view-thumb').removeClass('view-list');
			_this.addClass('thum')
		}else {
			$listPack.addClass('view-list').removeClass('view-thumb');
			_this.removeClass('thum');
		}
	});

	//상품리스트, 인기순 레이어, show/hide
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

	//상품리스트, 인기순 레이어, 딤드영역 클릭시 닫기
	$itemSortSec.find('.pop-popular .screen').on('click', function(e){
		e.preventDefault();
		var _this = $(this);
		_this.closest('.sec-sorting').children().removeClass('is-open');
	});
	//상품리스트, 워드 삭제
	$itemResult.find('.word-area').on('click', '.btn-remove', function (e) {
		e.preventDefault();
		var _this = $(this);
		_this.hide();
	});
	//상품리스트, 워드 swiper
	var wordSwiper = new Swiper('.item-result .swiper-container', { 
		slidesPerView: 'auto',
		spaceBetween: 5
	});
	//상품리스트, range 고정
	var $selecedArea = $body.find('.select-area');
	var ragewrapPos = $selecedArea.find('.range-area').offset().top;
	var scollTop = 0;
	$(window).scroll(function(){
		scollTop = $(window).scrollTop();
		var headerHeight = $('.comn-header').height();
		if( scollTop >= (ragewrapPos-headerHeight) ) {
			$selecedArea.addClass('is-fixed');
			$itemSortSec.find('.btn-popular').removeClass('is-open');
		}else {
			$selecedArea.removeClass('is-fixed');
		}
	});
});