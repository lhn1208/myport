$(document).ready(function(){

	var $body = $('body');
	var $secBox = $body.find('.sec-box');
	var $secTitle = $secBox.find('.sec-tit');

	// 예약하기 > 공통 > 하단유틸로 위치이동
	$body.find('.float-btns-wrap').css('bottom','105px');

	// 예약하기 > 공통 > .sec-box 열기/닫기
	$secTitle.on('click', 'a', function(e){
		e.preventDefault();
		var _this = $(this);
		var _thisSecbox = _this.closest('.sec-box');
		if( !_thisSecbox.hasClass('is-open') ){
			_thisSecbox.addClass('is-open');
		}else{
			_thisSecbox.removeClass('is-open');
		}
	});
	
	// 예약하기 > 상세 > 1:1 TALK
	var $fontChangePop = $body.find('.talk-select-pop');
	$body.find('.resr-view-talk').on('click', 'a', function(e){
		e.preventDefault();
		$body.addClass('layer-dim');
		$fontChangePop.show();
	});
	$fontChangePop.on('click', '.screen, .close', function(e){
		e.preventDefault();
		e.stopPropagation();
		$body.removeClass('layer-dim');
		$fontChangePop.hide();
	});

	// 예약하기 > 공통 > 인풋입력 애니메이션
	var $touristInfo = $body.find('.touristinfo ');
	$touristInfo.find('.input-wrap .input').each(function(e){ //value 값이 있는 input의 경우 
		if( !$(this).val() == '' ){
			$(this).closest('.input-wrap').addClass('off');
		}
	});
	$touristInfo.find('.input-wrap .input').on({
		"focusin" : function (e) {
			$(this).closest('.input-wrap').addClass('off');
		},
		"focusout" : function (e) {
			if($(this).val() == '') $(this).closest('.input-wrap').removeClass('off');
		}
	});	

	// 예약하기 >  공통 > 센딩방식변경
	$touristInfo.each(function(){
		var $sendingtxtBtn = $(this).find('.btn-tog');
		$sendingtxtBtn.on('click', function(e){
			e.preventDefault();
			e.stopPropagation();
			if( !$(this).hasClass('is-open') ){
				$sendingtxtBtn.addClass('is-open');
			} else {
				$sendingtxtBtn.removeClass('is-open');
			}
		});
	});

	// 예약하기 > 입력 > 나머지 여행자 정보 입력하기
	$body.find('.btn-more-person').on('click', function(e){
		e.preventDefault();
		var _this = $(this);
		if( !_this.hasClass('is-show') ) {
			_this.addClass('is-show').text('접기');
			$body.find('.touristinfo').addClass('is-open');
		}else {
			_this.removeClass('is-show').text('나머지 여행자 정보 입력하기');
			$body.find('.touristinfo').not('.touristinfo:first').removeClass('is-open');
			var firstTouristPos = $body.find('.touristinfo-wrap').offset().top - $body.find('.comn-header').height();
			$(window).scrollTop(firstTouristPos);
		}
	});

	// 예약하기 > 입력/상세  > 하단펼침 레이어 show/hide	
	var $statement = $body.find('.sec-statement');
	$statement.on('click', '.btn-view-more, .btn-state-more', function(e){
		e.preventDefault();
		e.stopPropagation();
		var _this = $(this);
		if( !_this.closest('.sec-statement').hasClass('is-open') ){
			_this.closest('.sec-statement').addClass('is-open');
			$body.addClass('layer-dim');
			$body.find('.float-btns-wrap').hide();
		}else{
			_this.closest('.sec-statement').removeClass('is-open');
			$body.removeClass('layer-dim');
			$body.find('.float-btns-wrap').show();
			
			_this.closest('.sec-statement').find('.table-wrap').removeClass('is-open'); //상세 > 내역확인 테이블
		}
	});
	$statement.on('click', '.screen', function(e){
		e.preventDefault();
		var _this = $(this);
		_this.closest('.sec-statement').removeClass('is-open');
		$body.removeClass('layer-dim');
	});

	$statement.on('click', '.btn-viewdetail', function(e){ //상세 > 내역확인
		e.preventDefault();
		var _this = $(this);
		if( !_this.closest('.paid').hasClass('is-open')) {
			_this.closest('.paid').addClass('is-open');
		}else {
			_this.closest('.paid').removeClass('is-open');
		}
	});

	// 예약하기 > 입력 > 하단펼침 레이어, 인원 증가/감소
	$statement.find('.adjust').on('click', 'button', function(){
		var _this =  $(this);
		var currntNum = Number(_this.siblings('.num').text());			
		var index = _this.closest('.lst-fare li').index();
		if(_this.closest('li').hasClass('disabled')) {
			return false;
		}
		if (index == 0) { //성인
			if(_this.hasClass('btn-plus')){
				if(currntNum == 10){
					alert('10명 초과 선택이 불가합니다.');
				}else {
					currntNum ++;
				}
			}else{
				if(currntNum <= 1){
					alert('최소 1명 이상 선택해주세요.');
				}else {
					currntNum --;
				}
			}

		}else { //아동 No Bed, 아동 Extra Bed, 유아		
			if(_this.hasClass('btn-plus')){
				if(currntNum == 10){
					alert('10명 초과 선택이 불가합니다.');
				}else {
					currntNum ++;
				}
			}else{
				if(currntNum <= 0){
					return false; //0명이하 선택불가
				}else {
					currntNum --;
				}
			}
		}
		_this.siblings('.num').text(currntNum);
		return false;
	});

	// 예약하기 > 입력/약관 > 예약하기 버튼 누를때, 유효성문구 노출(임시)
	$body.find('.reser-content-write .btn-reserve, .reser-content-terms .btn-area a').on('click', function(e){
		e.preventDefault();
		$('.invalid-txt').show();
		$secBox.each(function(){
			if( !$(this).hasClass('is-open') ) {
				$(this).addClass('is-open');
			}
		});
	});
	
	// 예약하기 > 입력 > 비회원 예약가입 팝업 열기
	if($('.login-nonmember').length == 1) {
		$('.login-nonmember .pop-open').trigger('click');
	}

	// 예약하기 > 상세 > 상단 기준 팝업 show/hide
	var $popSmall = $body.find('.pop-reserve-s');
	$body.on('click', '.pop-open-s', function(e){
		e.preventDefault();
		var _this = $(this);
		popID = _this.attr('href');			
		$body.addClass('layer-dim');
		$body.find(popID).show();
	});
	$popSmall.on('click', '.screen, .close', function(e){
		e.preventDefault();
		e.stopPropagation();
		$body.removeClass('layer-dim');
		$popSmall.hide();
	});

	// 예약하기 > 상세 > 필수확인내용보기
	$body.find('.btn-prgrs').on('click', function(e){
		e.preventDefault();
		var _this = $(this);
		var $prgrsWrap = _this.closest('.prgrs-wrap')
		if( !$prgrsWrap.hasClass('is-open') ){
			$prgrsWrap.addClass('is-open');
		}else {
			$prgrsWrap.removeClass('is-open');
		}
	});

	// 예약하기 > 상세 > 팝업 - 투어마일리지 적립/여권자동인식, 카카오톡/SMS 선택
	$body.find('.btn-selec-sns').on('click', 'a', function(e){
		e.preventDefault();
		if( $(this).hasClass('btn-sms')) {
			$('.mobile-regi-wrap').addClass('is-open');
		}else {
			$('.mobile-regi-wrap').removeClass('is-open');
		}
	});

	// 예약하기 > 상세 > 팝업 - 투어마일리지 적립/여권자동인식, 인풋추가
	var $mobileSec = $body.find('.mobile-regi-wrap');
	$body.on('click', '.btn-remove-phone', function(e){
		e.preventDefault();
		$(this).closest('.input-wrap').remove();
	});
	$mobileSec.find('.btn-tel-send').on('click', '.btn-add', function(e){
		e.preventDefault();
		var inputWrapHtml = '';
			inputWrapHtml += '<div class="input-wrap">';
			inputWrapHtml += '<input type="tel" id="" name="" class="input" title="핸드폰번호 입력" placeholder="숫자만 입력 해 주세요.">';
			inputWrapHtml += '<a href="#" class="btn-remove-phone"><span class="blind">지우기</span></a>';
			inputWrapHtml += '</div>';
			$mobileSec.find('.mobile-box').append(inputWrapHtml);
	});

	// 예약하기 > 상세 > 팝업 - 만족도 조사, 별선택
	$body.find('.star-wrap').on('click', 'a', function(){
		var _this = $(this);
		_this.addClass('on').prevAll().addClass('on');
		_this.nextAll().removeClass('on');
		return false;
	});

	//유효성검사 스크롤이동
	$body.find('.btn-reserve').on('click', function(){
		var termPos = $('.termagree').offset().top;
		$('html, body').animate({scrollTop: termPos}, 200);
	});

});