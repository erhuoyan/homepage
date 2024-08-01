var iUp = (function () {
	var time = 0,
		duration = 150,
		clean = function () {
			time = 0;
		},
		up = function (element) {
			setTimeout(function () {
				element.classList.add("up");
			}, time);
			time += duration;
		},
		down = function (element) {
			element.classList.remove("up");
		},
		toggle = function (element) {
			setTimeout(function () {
				element.classList.toggle("up");
			}, time);
			time += duration;
		};
	return {
		clean: clean,
		up: up,
		down: down,
		toggle: toggle
	};
})();

function getBingImages() {
	/**
	 * 获取Bing壁纸
	 * 先使用 GitHub Action 每天获取 Bing 壁纸 URL 并更新 images.json 文件
	 * 然后读取 images.json 文件中的数据
	 */
	
	/**
		修改为从本地加载图片
		图片通过python脚本每天定时获取保存到本地
		图片在获取后进行了压缩以保证浏览器加载速度
		具体见getimage.py
	*/

	var indexName = "bing-image-index";
	var index = sessionStorage.getItem(indexName);
	var panel = document.querySelector('#panel');
	if (isNaN(index) || index >= 9) index = 0;
	else index++;
	// var imgUrl = imgUrls[index];
	var imgid = index.toString();
	// var url = "https://www.cn.bing.com" + imgUrl;
	// panel.style.background = "url('" + url + "') center center no-repeat #666";

	var url = "/assets/img/" + imgid;
	// panel.style.background = "url('" + url + "') center center no-repeat #666";
	if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
		// 当前设备是移动设备
		url = url + "m.webp";
		panel.style.background = "url('" + url + "') center center no-repeat #666";
		panel.style.backgroundSize = "cover";
	}
	else	{
		url = url + "pc.webp";
		panel.style.background = "url('" + url + "') center center no-repeat #666";
		panel.style.backgroundSize = "cover";
	}

	sessionStorage.setItem(indexName, index);
}

function decryptEmail(encoded) {
	var address = atob(encoded);
	window.location.href = "mailto:" + address;
}

document.addEventListener('DOMContentLoaded', function () {
	// // 获取一言数据
	fetch('https://v1.hitokoto.cn')
	.then(response => response.json())
	.then(data => {
		const hitokoto = document.querySelector('#description')
		hitokoto.href = `https://hitokoto.cn/?uuid=${data.uuid}`
		hitokoto.innerHTML = data.hitokoto + "<br/> -「<strong>" + data.from + "</strong>」"
	})
	.catch(console.error)

	var iUpElements = document.querySelectorAll(".iUp");
	iUpElements.forEach(function (element) {
		iUp.up(element);
	});

	var avatarElement = document.querySelector(".js-avatar");
	avatarElement.addEventListener('load', function () {
		avatarElement.classList.add("show");
	});
});

var btnMobileMenu = document.querySelector('.btn-mobile-menu__icon');
var navigationWrapper = document.querySelector('.navigation-wrapper');

btnMobileMenu.addEventListener('click', function () {
	if (navigationWrapper.style.display == "block") {
		navigationWrapper.addEventListener('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
			navigationWrapper.classList.toggle('visible');
			navigationWrapper.classList.toggle('animated');
			navigationWrapper.classList.toggle('bounceOutUp');
			navigationWrapper.removeEventListener('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', arguments.callee);
		});
		navigationWrapper.classList.toggle('animated');
		navigationWrapper.classList.toggle('bounceInDown');
		navigationWrapper.classList.toggle('animated');
		navigationWrapper.classList.toggle('bounceOutUp');
	} else {
		navigationWrapper.classList.toggle('visible');
		navigationWrapper.classList.toggle('animated');
		navigationWrapper.classList.toggle('bounceInDown');
	}
	btnMobileMenu.classList.toggle('social');
	btnMobileMenu.classList.toggle('iconfont');
	btnMobileMenu.classList.toggle('icon-list');
	btnMobileMenu.classList.toggle('social');
	btnMobileMenu.classList.toggle('iconfont');
	btnMobileMenu.classList.toggle('icon-angleup');
	btnMobileMenu.classList.toggle('animated');
	btnMobileMenu.classList.toggle('fadeIn');
});
