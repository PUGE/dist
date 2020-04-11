jQuery(document).ready(function ($) {
  Slide.init(document.getElementById('slider'), 'ul', 'li')
  $('a.control_prev').click(function () {
    Slide.prev();
  });
  
  $('a.control_next').click(function () {
    Slide.next();
  });
});


var Slide = {
  init: function (domBox, container, slideName) {
    if (!domBox) return
    this.slideList = domBox.querySelectorAll(slideName)
    this.slideName = slideName
    this.slideCount = this.slideList.length
    this.slideWidth = domBox.offsetWidth
    this.slideHeight = domBox.offsetHeight
    this.sliderUlWidth = this.slideWidth * this.slideCount
    // 设置每个slide的class
    for (var index = 0; index < this.slideList.length; index++) {
      var element = this.slideList[index];
      element.classList.add('slide')
      element.classList.add('slide-' + index)
      element.style.width = this.slideWidth + 'px'
      element.style.height = this.slideHeight + 'px'
    }
    // 盒子
    this.container = document.querySelector(container)
    this.container.style.width = this.sliderUlWidth + 'px'
    this.container.style.height = this.slideHeight + 'px'
    this.container.style.marginLeft = -this.slideWidth + 'px'
    this.container.prepend(this.container.querySelector(slideName + ':last-child'))
  },
  next: function () {
    var _this = this
    $('#slider ul').animate({
      left: - this.slideWidth
    }, 200, function () {
      _this.container.append(_this.container.querySelector(_this.slideName + ':first-child'))
      $('#slider ul').css('left', '');
    });
  },
  prev: function () {
    var _this = this
    $('#slider ul').animate({
      left: +this.slideWidth
    }, 200, function () {
      _this.container.prepend(_this.container.querySelector(_this.slideName + ':last-child'))
      $('#slider ul').css('left', '');
    });
  }
}