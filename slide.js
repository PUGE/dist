// 使用方法
// Slide.init(轮播图容器，container元素，slide元素，配置项)
var Slide = function (domBox, container, slideName, config) {
  if (!domBox) return
  config = config || {}
  // 初始化样式
  this._addStyle()
  this._addClass(domBox, "people-slide")
  this.slideList = domBox.querySelectorAll(slideName)
  this.activeEl = this.slideList[0]
  this.slideName = slideName
  this.activeIndex = 0
  this.config = config
  this.slideCount = this.slideList.length
  this.slideWidth = domBox.offsetWidth
  this.slideHeight = domBox.offsetHeight
  this.sliderUlWidth = this.slideWidth * this.slideCount
  // 设置每个slide的class
  for (var index = 0; index < this.slideList.length; index++) {
    var element = this.slideList[index];
    // 兼容IE写法
    this._addClass(element, "slide")
    this._addClass(element, "slide-" + index)
    element.style.width = this.slideWidth + 'px'
    element.style.height = this.slideHeight + 'px'
  }
  // 盒子
  this.container = domBox.querySelector(container)
  this.container.style.width = this.sliderUlWidth + 'px'
  this.container.style.height = this.slideHeight + 'px'
  this.container.style.marginLeft = -this.slideWidth + 'px'
  this.container.style.left = '0px'
  // 添加盒子的class
  this._addClass(this.container, "people-container")
  // 兼容IE写法
  if (this.container.prepend) {
    this.container.prepend(this.container.querySelector(slideName + ':last-child'))
  } else if (this.container.insertBefore) {
    var slideList = this.container.querySelectorAll(slideName)
    var last = slideList[slideList.length - 1]
    this.container.insertBefore(last, this.container.childNodes[0])
  }
  var _this = this
  // 判断是否自动播放
  if (config.autoPlay) {
    setTimeout(function () { _this.startAutoPlay(config.autoPlay); }, 0);
  }

  // 判断是否有上一个下一个按钮配置
  if (config.nextEl) {
    
    var button = domBox.querySelector(config.nextEl)
    
    if (button) {
      button.onclick = function () {
        _this.next()
      }
    }
  }
  if (config.prevEl) {
    var button = domBox.querySelector(config.prevEl)
    if (button) {
      button.onclick = function () {
        _this.prev()
      }
    }
  }
  // 判断是否有分页器
  if (config.numberPaginationEL) {
    var el = domBox.querySelector(config.numberPaginationEL)
    if (el) this.numberPaginationEL = el
  }

  // 初始化成功也算改变slide
  _this._changeSlide()

  // 定义一些方法
  this.next = function () {
    var _this = this
    // 设置状态为忙碌
    _this.isBusy = true
    _this.container.style.transition = 'left 0.2s'
    _this.container.style.left = -this.slideWidth + 'px'
    this.activeIndex++
    if (this.activeIndex >= this.slideCount) this.activeIndex = 0
    setTimeout(function () {
      _this.container.style.transition = ''
      _this._appendChild(_this.container, _this.container.querySelector(_this.slideName + ':first-child'))
      _this.container.style.left = '0px'
    }, 300);
    // 轮播图改变事件
    _this._changeSlide()
    // 三秒后解除忙碌状态
    setTimeout(function () {
      _this.isBusy = false
    }, 3000);
  }
  this.prev = function () {
    var _this = this
    // 设置状态为忙碌
    _this.isBusy = true
    this.container.style.transition = 'left 0.2s'
    _this.container.style.left = this.slideWidth + 'px'
    this.activeIndex--
    if (this.activeIndex < 0) this.activeIndex = this.slideCount - 1
    // 轮播图改变事件
    _this._changeSlide()
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
  }
  this.startAutoPlay = function (interval) {
    // 没有设置自动播放间隔默认三秒
    interval = interval || 3000
    if (!this._autoPlayIsInit) this._initAutoPlay(interval)
    if (this.clock != undefined) return
    // console.log('开始自动播放')
    var _this = this
    this.clock = setInterval(function () {
      // console.log('自动播放!')
      if (!_this.isBusy) _this.next()
    }, interval);
  }
  this.stopAutoPlay = function () {
    if (this.clock == undefined) return
    // console.log('停止自动播放')
    clearInterval(this.clock)
    this.clock = undefined
  }
}

Slide.prototype._addClass = function (dom, className) {
  if (dom.classList) {
    dom.classList.add(className)
  } else {
    dom.className += " " + className
  }
}

// 兼容IE的事件监听
Slide.prototype._addEventListener = function (dom, name, func) {
  if (dom.attachEvent) {    
    dom.attachEvent(name, func);    
  } else if (window.addEventListener) {    
    dom.addEventListener(name, func, false);      
  }  
}
// 兼容IE的appendChild
Slide.prototype._appendChild = function (dom, appendDom) {
  if (dom.append) {
    dom.append(appendDom)
  } else if (dom.appendChild) {
    dom.appendChild(appendDom)
  }
}

// 添加必要的css代码
Slide.prototype._addStyle = function (dom, appendDom) {
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

Slide.prototype._initAutoPlay = function (interval) {
  var _this = this
  this._autoPlayIsInit = true
  interval = interval || 3000
  // 鼠标悬浮停止轮播
  this._addEventListener(this.container, 'mouseover', function (e) {
    setTimeout(function() {
      _this.stopAutoPlay()
    }, 0);
  })
  // 鼠标移出开始轮播
  this._addEventListener(this.container, 'mouseout', function (e) {
    setTimeout(function() {
      if (_this.clock == undefined) _this.startAutoPlay(interval)
    }, 0);
  })
}

Slide.prototype._changeSlide = function () {
  if (this.numberPaginationEL) {
    this.numberPaginationEL.innerHTML = '<span class="active-index">' + (this.activeIndex + 1) + '</span><span class="separator">/</span><span class="slide-count">' + (this.slideCount) + '</span>'
  }
  // 清除上一个活跃class
  if (this.activeEl.classList) {
    this.activeEl.classList.remove('active-slide')
  } else {
    this.activeEl.className = this.activeEl.className.replace(/(^|\s+)active-slide(?=$|\s+)/,"")
  }
  // 给活跃slide设置class
  this.activeEl = this.slideList[this.activeIndex]
  this._addClass(this.activeEl, 'active-slide')
  
  // 轮播图改变回调
  if (this.config.onSlideChange) {
    this.config.onSlideChange(this)
  }
}