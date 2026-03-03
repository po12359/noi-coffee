$(function () {
    var $animation = $('.icon-animation');
    var $subMenuAanim = $('.plus_icon');

    $animation.on('click',function(){
        if ($(this).hasClass('is-open')){
            $(this).removeClass('is-open');
        } else {
            $(this).addClass('is-open');
        }
	    $("ul.top_nav_ul_sp").slideToggle(200);
    });

    $subMenuAanim.on('click',function(){
        if ($(this).hasClass('sub_open')){
            $(this).removeClass('sub_open');
        } else {
            $(this).addClass('sub_open');
        }
	    $(this).next("ul.sub_navi").slideToggle(200);
    });
});

$('ul.top_nav_ul_sp a[href]').on('click', function(event) {
        $('#hamburger_icon').trigger('click');
    });