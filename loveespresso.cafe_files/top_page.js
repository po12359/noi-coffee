//�X�N���[�����g�b�v���ǂ����̃t���O����
var flgScrollStart = 0;

//�}�E�X�̃z�o�[�A�j������
var flgMouseDefault = 0;

//�w�b�_�[�����̃X�N���[�������ւ��ʒu
var headerPos = 300;

$(function() {
	console.log("tokita");
	$('#container').css('display','none');
	$('#loader-bg ,#loader').css('display','block');
	$('#loader-bg ,#loader2').css('display','block');
});

$(window).load(function () { //�S�Ă̓ǂݍ��݂��������������s
	$('#loader-bg').delay(900).fadeOut(800);
	$('#loader').delay(600).fadeOut(300);
	$('#loader2').delay(600).fadeOut(300);
	$('#container').css('display', 'block');
	MovieAnim();
	MouseFunc();
	HeaderNavi();
});

//10�b�������狭���I�Ƀ��[�h���ʂ����\��
$(function(){
	setTimeout('stopload()',10000);
});

function stopload(){
	console.log("LoadOver");
	$('#loader-bg').delay(900).fadeOut(800);
	$('#loader').delay(600).fadeOut(300);
	$('#loader2').delay(600).fadeOut(300);
	$('#container').css('display', 'block');
}
