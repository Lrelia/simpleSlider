(function(){
	Function.prototype.bind = Function.prototype.bind || function(context){
		var _this = this;

		return function(){
			_this.apply(context, arguments);
		};
	};

	/**
	 *	sliderDom: slider容器元素
	 *	animation: 自定义的过渡动画
	 *  sensitivity: 自定义灵敏度（px）
	 **/
	window.simpleSlider = function(options) {
		this.slider = options.sliderDom ? options.sliderDom : document.querySelector(".simpleSlider");
		// this.sliderNavDom = options.sliderNavDom ? options.sliderNavDom 
		this.animation = options.animation || "transform .4s ease";
		// this.sliderNavCurrent = this.slider.firstElementChild;
		this.sensitivity = options.sensitivity || 60;
		this.sliderPos = 0; // slider的当前移动距离
		this.viewportWidth = document.documentElement.clientWidth; // viewport的宽度
		this.pageLength = this.slider.childElementCount; // 页数
		this.boundaryMax = -this.viewportWidth * (this.pageLength - 1); // slider的左移动距离边界值
		this.sliderWidth = "width:" + this.pageLength * 100 + "%;"; // slider的宽度值
		this.slider.style.cssText = this.sliderWidth; // 初始化slider的宽度

		// 初始化slider
		this.init();

		// 阻止浏览器上下滑动
		document.querySelector('body').addEventListener('touchstart', function(evt){
		    evt.preventDefault();
		});
		return this;
	};

	simpleSlider.prototype.init = function() {
		var that = this;
			// sliderLi = this.slider.children;

		// for (var i = 0; i < sliderLi.length; i++) {
		// 	sliderLi[i].style.cssText = "width:" + this.viewportWidth + "px";
		// }
		
		// 触摸开始
		document.addEventListener("touchstart", that.handleTouchstart.bind(that), false);

		// 触摸结束
		document.addEventListener("touchend", that.handleTouchend.bind(that), false);
	}

	simpleSlider.prototype.handleTouchstart = function(evt) {
		// 设置触摸开始时的边界值
		this.pos = evt.touches[0].clientX;
	}

	simpleSlider.prototype.handleTouchend = function(evt) {
		// 如果左移动距离超过灵敏度距离，则向左翻页
		if(evt.changedTouches[0].clientX - this.pos < -this.sensitivity && this.sliderPos != this.boundaryMax) {
			this.sliderPos -= this.viewportWidth;
			this.slider.style.cssText = this.sliderWidth + "-webkit-transition:" + this.animation + ";transition:" + this.animation +  ";-webkit-transform:translateX(" + this.sliderPos + "px);transform:translateX(" +  this.sliderPos + "px);";
		// 如果右移动距离超过灵敏度距离，则向左翻页
		} else if(evt.changedTouches[0].clientX - this.pos > this.sensitivity && this.sliderPos != 0) {
			this.sliderPos += this.viewportWidth;
			this.slider.style.cssText = this.sliderWidth + "-webkit-transition:" + this.animation + ";transition:" + this.animation +  ";-webkit-transform:translateX(" + this.sliderPos + "px);transform:translateX(" +  this.sliderPos + "px);";
		}
	}
})();