define(['module-tool'], function(modtool) {
	return {
		taobao: (function() {
			
			var taobao=modtool.getelement('.taobao')[0];
			var aBtn =modtool.getelement('.taobao ol li'); 
			var aLi = document.querySelectorAll('.taobao ul li');
			var oUl = document.querySelector('.taobao ul');
			var left = document.querySelector('.left');
			var right = document.querySelector('.right');
			var num = 0; //存储当前的索引
			var bstop = true;

			//1.改变布局.
			var firstpic = aLi[0].cloneNode(true);
			var lastpic = aLi[aLi.length - 1].cloneNode(true);

			oUl.appendChild(firstpic);
			oUl.insertBefore(lastpic, oUl.children[0]);
			aLi = document.querySelectorAll('.taobao ul li'); //7

			var liwidth = aLi[0].offsetWidth;

			oUl.style.width = aLi.length * liwidth + 'px';
			oUl.style.left = -liwidth + 'px';

			//2.小圆圈添加点击事件
			for(var i = 0; i < aBtn.length; i++) {
				aBtn[i].index = i; //自定义的属性
				aBtn[i].onclick = function() {
					num = this.index;
					tabSwitch();
					aBtn[num].className = 'active';
				}
			}
			//3.显示左右箭头
			taobao.onmouseover = function() {
				left.style.display = 'block';
				right.style.display = 'block';
				clearInterval(timer);
			};

			taobao.onmouseout = function() {
				left.style.display = 'none';
				right.style.display = 'none';
				timer = setInterval(function() {
					right.onclick();
				}, 2000);
			}

			//4.左右箭头添加点击事件
			right.onclick = function() {
				if(bstop) {
					bstop = false;
					num++;
					tabSwitch();
					if(num == aBtn.length) {
						aBtn[0].className = 'active';
					} else {
						aBtn[num].className = 'active';
					}
					document.title = num;
				}
			}

			left.onclick = function() {
				if(bstop) {
					bstop = false;
					num--;
					tabSwitch();
					if(num < 0) {
						aBtn[aBtn.length - 1].className = 'active';
					} else {
						aBtn[num].className = 'active';
					}
					document.title = num;
				}

			}

			//5.自动播放
			var timer = setInterval(function() {
				right.onclick();
			}, 2000);

			//ul位置移动的过程.
			function tabSwitch() {
				for(var i = 0; i < aBtn.length; i++) {
					aBtn[i].className = '';
				}
				modtool.buffermove(oUl, {
					left: -(num + 1) * liwidth
				}, function() {
					if(parseInt(oUl.style.left) < -liwidth * aBtn.length) {
						oUl.style.left = -liwidth + 'px';
						num = 0;
					}
					if(parseInt(oUl.style.left) > -liwidth) {
						oUl.style.left = -liwidth * aBtn.length + 'px';
						num = aBtn.length - 1;
					}
					bstop = true;
				});
			}
		})()
	}
});