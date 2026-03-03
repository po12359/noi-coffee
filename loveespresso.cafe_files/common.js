$(document).ready(function() {


	/* ----------------------------------------------------------------
	* スクロール時にナビゲーション表示　↓*/


	var pageTop = $('#pageup');
	pageTop.hide();
	$(window).scroll(function () {
		if ($(this).scrollTop() > 600) {
			pageTop.fadeIn();
		} else {
			pageTop.fadeOut();
		}
	});
	//	pageTop.click(function () {
		//		$().animate({scrollTop:0}, 500, 'swing');
		//		return false;
		//	});

		/* スクロール時にナビゲーション表示　↑
		* ----------------------------------------------------------------*/


	});

var slideDuration = 5000;

$(window).load(function () {
	var slideCount = $('#main_content').data('s_num');
	var slideCurrent = 1;
	var slideNext = 2;
	setInterval(function(){
		SlideCont(slideCurrent,slideNext);
		setTimeout(function(){
			slideCurrent = slideCurrent + 1;
			if(slideCurrent > slideCount){slideCurrent = 1;}
			slideNext = slideCurrent + 1;
			if(slideNext > slideCount){slideNext = 1;}
		},1);
	},slideDuration);


	var slideMenuCount = $('#menu_content').data('s_num');
	var slideMenuCurrent = 1;
	var slideMenuNext = 2;
	setInterval(function(){
		SlideMenuCont(slideMenuCurrent,slideMenuNext);
		setTimeout(function(){
			slideMenuCurrent = slideMenuCurrent + 1;
			if(slideMenuCurrent > slideMenuCount){slideMenuCurrent = 1;}
			slideMenuNext = slideMenuCurrent + 1;
			if(slideMenuNext > slideMenuCount){slideMenuNext = 1;}
		},1);
	},slideDuration);

});

function SlideCont(slideCurrent,slideNext){
	$('#main_content #slide0'+ slideNext).addClass("active");
	$('#main_content #slide0'+ slideCurrent).removeClass("active");
}

function SlideMenuCont(slideCurrent,slideNext){
	$('#menu_content #slide0'+ slideNext).addClass("active");
	$('#menu_content #slide0'+ slideCurrent).removeClass("active");
}

$(function(){
	$('a[href^="#"]').click(function(){
		var speed = 500;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		//ヘッダーの高さを取得
		var header = $('header').height();
		//ヘッダーの高さを引く
		var position = target.offset().top - header;
		$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
	});
});
