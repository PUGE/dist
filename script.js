window.onload = function () {
  Slide.init(document.getElementById('slider'), 'ul', 'li', 3000)
}

function prev() {
  Slide.prev();
}

function next() {
  Slide.next();
}


var Slide = {
  init: function (domBox, container, slideName, autoPlay) {
    if (!domBox) return
    // 初始化样式
    this.addStyle()
    this.addClass(domBox, "people-slide")
    this.slideList = domBox.querySelectorAll(slideName)
    this.slideName = slideName
    this.slideCount = this.slideList.length
    this.slideWidth = domBox.offsetWidth
    this.slideHeight = domBox.offsetHeight
    this.sliderUlWidth = this.slideWidth * this.slideCount
    // 设置每个slide的class
    for (var index = 0; index < this.slideList.length; index++) {
      var element = this.slideList[index];
      // 兼容IE写法
      this.addClass(element, "slide")
      this.addClass(element, "slide-" + index)
      element.style.width = this.slideWidth + 'px'
      element.style.height = this.slideHeight + 'px'
    }
    // 盒子
    this.container = document.querySelector(container)
    this.container.style.width = this.sliderUlWidth + 'px'
    this.container.style.height = this.slideHeight + 'px'
    this.container.style.marginLeft = -this.slideWidth + 'px'
    this.container.style.left = '0px'
    // 添加盒子的class
    this.addClass(this.container, "people-container")
    // 兼容IE写法
    if (this.container.prepend) {
      this.container.prepend(this.container.querySelector(slideName + ':last-child'))
    } else if (this.container.insertBefore) {
      var slideList = this.container.querySelectorAll(slideName)
      var last = slideList[slideList.length - 1]
      this.container.insertBefore(last, this.container.childNodes[0])
    }
    // 判断是否自动播放
    if (autoPlay) this.autoPlay(autoPlay)
  },
  next: function () {
    var _this = this
    // 设置状态为忙碌
    _this.isBusy = true
    _this.container.style.transition = 'left 0.2s'
    _this.container.style.left = -this.slideWidth + 'px'
    setTimeout(function () {
      _this.container.style.transition = ''
      _this.appendChild(_this.container, _this.container.querySelector(_this.slideName + ':first-child'))
      _this.container.style.left = '0px'
    }, 300);
    // 三秒后解除忙碌状态
    setTimeout(function () {
      _this.isBusy = false
    }, 3000);
  },
  prev: function () {
    var _this = this
    // 设置状态为忙碌
    _this.isBusy = true
    this.container.style.transition = 'left 0.2s'
    _this.container.style.left = this.slideWidth + 'px'
    setTimeout(function () {
      _this.container.style.transition = ''
      if (_this.container.prepend) {
        _this.container.prepend(_this.container.querySelector(_this.slideName + ':last-child'))
      } else if (_this.container.insertBefore) {
        var slideList = _this.container.querySelectorAll(_this.slideName)
        var last = slideList[slideList.length - 1]
        _this.container.insertBefore(last, _this.container.childNodes[0])
      }
      _this.container.style.left = '0px'
    }, 300);
    // 三秒后解除忙碌状态
    setTimeout(function () {
      _this.isBusy = false
    }, 3000);
  },
  autoPlay: function (interval) {
    var _this = this
    this.clock = setInterval(function () {
      console.log('自动播放!')
      if (!_this.isBusy) this.next()
    }, interval);
  },
  // 兼容IE添加class
  addClass: function (dom, className) {
    if (dom.classList) {
      dom.classList.add(className)
    } else {
      dom.className += " " + className
    }
  },
  // 兼容IE的appendChild
  appendChild: function (dom, appendDom) {
    if (dom.append) {
      dom.append(appendDom)
    } else if (dom.appendChild) {
      dom.appendChild(appendDom)
    }
  },
  addStyle: function() {
    var styleElement = document.getElementById('peopleSlideStyle');
    if (!styleElement) {
      var needStyle = ".people-slide {position: relative;overflow: hidden;width: 655px;height: 414px;}.people-container {margin: 0;padding: 0;list-style: none;position: relative;height: 100%;}"
      needStyle += ".people-container:after {content:'';height: 0;line-height: 0;display: block;visibility: hidden;clear: both;zoom: 1;}"
      needStyle += ".people-container .slide {position: relative;display: block;float: left;margin: 0;padding: 0;}"
      needStyle += ".people-container .slide a, .people-container .slide img {display: block;width: 100%;height: 100%;}"
      
      if (document.all) {
        var styleSheet = document.createStyleSheet("");
        styleSheet.cssText = needStyle;
      } else { 
        var style = document.createElement('style'); 
        style.type = 'text/css'; 
        style.innerHTML = needStyle; 
        document.getElementsByTagName('HEAD').item(0).appendChild(style); 
      }
    }
  }
}