/* 
  아래와 같은 형식으로 html을 작성한 후 플러그인을 적용하세요

  <div class="banner">
    <ul>
      <li><img src="" /></li>
      <li><img src="" /></li>
      <li><img src="" /></li>
      <li><img src="" /></li>
    </ul>
  </div> 

  option

    1. width: 슬라이드의 크기
    2. time: 다음 이미지로 슬라이드하는 데에 걸리는 시간

*/


$(function() {
  $.fn.slide = function(width, time) {
    var $div = $(this);
    var $ul = $(this).find("ul");
    var $li = $(this).find("li");
    var $bannerWidth;
    var $bannerHeight;
    var $bannerLength;
    var elementHeight;

    // 요소에 css 적용

    $div.css({'position':'relative', 'width':width, 'overflow':'hidden'});
    $ul.css({'position':'absolute', 'padding':'0', "margin":"0"});
    $li.each(function() {
      $(this).css({"float":"left", "list-style-type":"none"});
      $(this).find("img").css({"width":width, "height":"auto"});
    });

    var slideId = setInterval(function() { slideStart(); }, time);
    var currentImg = 1;

    // mouseover시 타이머 정지,
    // mouseout시 타이머 다시 실행

    $(this).mouseover(function() {
      clearInterval(slideId);
    });

    $(this).mouseout(function() {
      slideId = setInterval(function() { slideStart(); }, 5000);
    });

    function slideStart() {
      if (currentImg < $bannerLength) {
        $ul.animate({left: "-="+$bannerWidth + "px"}, 1000);
        currentImg += 1;
      } else {
        $ul.animate({left: "0px"}, 1000);
        currentImg = 1;
      }
    }

    elementHeight = setInterval(function() { changeHeight(); }, 10);

    function changeHeight() {
      $bannerWidth = $ul.children().outerWidth();
      $bannerHeight = $ul.children().outerHeight();
      $bannerLength = $ul.children().length;
      $ul.css("width", $bannerWidth * $bannerLength + "px");
      $ul.css("height", $bannerHeight + "px");
      $div.css("height", $bannerHeight);
    }
  }

  $(".banner").slide("100vw", "8000");

});