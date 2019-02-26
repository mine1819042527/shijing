//定义模块
define(['config'], function() {
	require(['jquery'], function() {
		//1.轮播图
		var $box = $('#box');
		var $btns = $('#box ol li');
		var $pics = $('#box ul li');
		var $left = $('#left');
		var $right = $('#right');
		var $timer = null;
		var $autoplaytimer = null;
		var $num = 0;
		$box.hover(function() {
			$('#left,#right').show();
			clearInterval($autoplaytimer);
		}, function() {
			$('#left,#right').hide();
			$autoplaytimer = setInterval(function() {
				$right.click();
			}, 3000);
		});
		$btns.hover(function() {
			$num = $(this).index(); //当前的索引
			$timer = setTimeout(function() {
				change();
			}, 400)

		}, function() {
			clearTimeout($timer);
		});
		$right.on('click', function() {
			$num++;
			if($num > $btns.length - 1) {
				$num = 0;
			}
			change();
		});
		$left.on('click', function() {
			$num--;
			if($num < 0) {
				$num = $btns.length - 1;
			}
			change();
		});

		function change() {
			$btns.eq($num).addClass('active').siblings('li').removeClass('active');
			$pics.eq($num).animate({
				opacity: 1
			}).siblings('li').animate({
				opacity: 0
			});
		}
		$autoplaytimer = setInterval(function() {
			$right.click();
		}, 3000);
	});
});