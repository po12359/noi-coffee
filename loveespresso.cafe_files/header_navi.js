function MouseFunc(){

	//マウスを乗せたら発動
	$('#h1_title_top').hover(function() {
		//マウスを乗せたら透明度用のクラスを追加
		$('#logo').stop(true,true).addClass('h1_hover');
	}, function() {
 		 //マウスを外すと透明度用のクラスを削除
		$('#logo').stop(true,true).removeClass('h1_hover');
	});

	//マウスを乗せたら発動
	$('ul.nav_ul > li').hover(function() {
	//マウスを乗せたらサブメニューを表示
		$(this).children('ul.nav_submenu').stop(true,true).fadeToggle(200);
		flgMouseDefault = 1;
	}, function() {
	//マウスを乗せたらサブメニューを非表示
	    if(flgMouseDefault != 0){ // フラグ判定
		$(this).children('ul.nav_submenu').stop(true,true).fadeToggle(200);
	    }
		flgMouseDefault = 1;
	});

};

function HeaderNavi(){

   $(window).scroll(function(){ // スクロール毎にイベントが発火します。
	//初期スクロール位置取得
	var scroll_Y = $(this).scrollTop(); 

	//ヘッダー入れ替え（下部スクロール時）
	if(flgScrollStart == 0){ // フラグ判定
	    if(scroll_Y > headerPos){ // スクロール量が、指定値を超えたら発火
		$('#h1_title_top').css('display','none');
		$('#header_top_nav').addClass('header_scroll');
		$('#header_sub_nav').slideToggle(300);
		$('header >> #logo').addClass('header_scroll');
		flgScrollStart = 1;
	    }
	}

	//ヘッダー入れ替え（トップに戻る時）
	if(flgScrollStart == 1){ // フラグ判定
	    if(scroll_Y <= headerPos){ // スクロール量が、指定値以下になると発火
		$('#h1_title_top').fadeToggle(300);
		$('#header_top_nav').removeClass('header_scroll');
		$('#header_sub_nav').slideToggle(300);
		$('header >> #logo').removeClass('header_scroll');
		flgScrollStart = 0;
	    }
	}
   })
};



