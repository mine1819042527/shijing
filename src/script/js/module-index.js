//定义模块
define(['config'], function() {
	require(['jquery'], function() {
			//1.链入顶部、头部、底部
			$('.gometop').load('top.html');
			
			//搜索框效果
			$('.gomeheader').load('header.html', function() {
					$('#gomesearch').on('focus', function() {
						$(this).val('');
					});
					$('#gomesearch').on('blur', function() {
						$(this).val('手机');
					});
					$('#gomesearch').on('input', function() {
							var that = $(this);
							$('.searchvalue').css('display', 'block');
							var $str = '';
							$.ajax({
								url: "https://suggest.taobao.com/sug?code=utf-8&q=" + $(this).val() + "&_ksTS=1548331259728_369&callback=baidu",
								async: true,
								dataType: 'jsonp'
							}).done(function(data) {
									$.each(data, function(index, element) {
										$.each(element, function(indexs, aa) {
											$str += `<li>${aa[0]}</li>`;
										});
									});
									if (that.val() == '') {
										$('.searchvalue').hide();
									} else {
										$('.searchvalue ul').html($str);
									}
									$('.searchvalue ul li').each(function() {
										$(this).on('click', function() {
											that.val($(this).html());
											$('.searchvalue').css('display', 'none');
										});
									});
									$('body').on('click', function() {
										$('.searchvalue').css('display', 'none');
									});
								

							});
					});
			}); 
			$('.gomefooter').load('footer.html');

		//2.顶部悬浮
		$(window).on('scroll', function() {
			var $top = $(window).scrollTop();
			if ($top >= 700) {
				$('.headscroll').stop(true).animate({
					top: 0
				});

			} else {
				$('.headscroll').stop(true).animate({
					top: -50
				});
			}
		});

		//3.侧边栏导航
		var $btns = $('.lisnav-ul li');
		var $contents = $('.subnav .fullcategory'); $btns.hover(function() {
			$(this).addClass('active').siblings('li').removeClass('active');
			$contents.eq($(this).index()).addClass('show').siblings('div').removeClass('show');
		}, function() {
			$(this).removeClass('active');
			$contents.eq($(this).index()).removeClass('show');
		}); $contents.hover(function() {
			$(this).addClass('show').siblings('div').removeClass('show');
		}, function() {
			$(this).removeClass('show');
		});

		//4.主体部分的tab切换
		var $btns1 = $('.tab li'); $btns1.on('click', function() {
			$(this).addClass('active1').siblings('li').removeClass('active1');
			$(this).parent().parent().parent().find($('.main')).eq($(this).index()).addClass('show1').siblings('div').removeClass('show1');
		});

		//5.轮播图
		var $lbox = $('.banner');
		var $lbtns = $('.banner ol li');
		var $lpics = $('.banner ul li');
		var $lleft = $('.pre');
		var $lright = $('.nex');
		var $timer = null;
		var $autoplaytimer = null;
		var $num = 0; $autoplaytimer = setInterval(function() {
			$num++;
			if ($num > $lbtns.length - 1) {
				$num = 0;
			}
			change($num);
		}, 5000); $lbox.hover(function() {
			$('.pre,.nex').show();
			clearInterval($autoplaytimer);
		}, function() {
			$('.pre,.nex').hide();
			clearInterval($autoplaytimer);
			$autoplaytimer = setInterval(function() {
				$num++;
				if ($num > $lbtns.length - 1) {
					$num = 0;
				}
				change($num);
			}, 5000);
		}); $lbtns.hover(function() {
			$num = $(this).index();
			$timer = setInterval(function() {
				change($num);
				clearInterval($time);
			}, 400);

		}, function() {
			clearInterval($timer);
		}); $lright.on('click', function() {
			$num++;
			if ($num > $lbtns.length - 1) {
				$num = 0;
			}
			change($num);
		}); $lleft.on('click', function() {
			$num--;
			if ($num < 0) {
				$num = $lbtns.length - 1;
			}
			change($num);
		});

		function change($num) {
			$lbtns.eq($num).addClass('active2').siblings('li').removeClass('active2');
			$lpics.eq($num).animate({
				opacity: 1
			}).siblings('li').animate({
				opacity: 0
			});
		}

		//6.楼梯效果
		$(window).on('scroll', function() {
			var $loutop = $(window).scrollTop();
			var $loutinav = $('#elevator');
			if ($loutop >= 2000) {
				$loutinav.show();
			} else {
				$loutinav.hide();
			}
			$('.section').each(function(index, element) {
				var $loucengtop = $(element).offset().top + 300;
				if ($loucengtop > $loutop) {
					$('#elevator li').removeClass('active3');
					$('#elevator li').eq(index).addClass('active3');
					return false;
				}
			});
		}); $('#elevator li').not('.current').on('click', function() {
			$(this).addClass('active3').siblings('li').removeClass('active3');
			var $loutop = $('.section').eq($(this).index()).offset().top;
			$('html,body').animate({
				scrollTop: $loutop
			});
		});

		$('.current').on('click', function() {
			$('html,body').animate({
				scrollTop: 0
			});
		});
		
		

		//7.懒加载

		/*;$(function() {
				$("img.lazy").lazyload({
					effect: "fadeIn"
				});
		});*/

		//8.连接数据
		$.ajax({
			url: 'http://localhost/jsSecond/gome/php/gomedata.php',
			dataType: 'json'
		}).done(function(data) {
			var strhtml = '<ul class="main_inner">';
			$.each(data, function(index, value) {
				strhtml += `
						<li>
									<a href="details.html?sid=${value.sid}" target="_blank" title="荣耀10青春版 尊享版"> 
									<img class="lazy" src="${value.url}" alt="荣耀10青春版 尊享版" width="130" height="130">
										<p class="p_name">${value.titile}</p>
										<p class="p_price"><span>¥</span>${value.price}</p>
									</a>
								</li>
					`;
			});
			strhtml += '</ul>';
			$('.maindata').html(strhtml);
		});
	});
});