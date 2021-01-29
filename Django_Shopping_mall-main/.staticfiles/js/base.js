$(document).ready(function() {

  // 홈페이지 일정 부분 이상 스크롤 시 헤더를 홈페이지 상단에 고정시키기

  $(window).scroll(function() {fixed();});
  $(window).resize(function() {fixed();});


  function fixed() {
    if ($(window).scrollTop() > 200) {
      $("header").addClass("fixed");
    } else {
      $("header").removeClass("fixed");
    }
  };

  // 카테고리 및 검색, 사용자 메뉴 hover시 슬라이드하기 (모바일 포함)

  $(".menu-list-item").each(function(){
    $(this).hover(function() {
      $(this).find("div").stop().slideDown(300);
    }, function() {
      $(this).find("div").stop().slideUp(300);
    });
  });

  $(".search-box").hover(function() {
    $(this).find("form").stop().slideDown(300);
  }, function() {
    $(this).find("form").stop().slideUp(300);
  });

  $(".user-box").hover(function() {
    $(this).find("div").stop().slideDown(300);
  }, function() {
    $(this).find("div").stop().slideUp(300);
  });

  $(".mobile-menu > button").click(function() {
    $(".mobile-menu-box").slideToggle(300);
  });

  $(".mobile-menu-list-item button").click(function() {
    $(this).next().slideToggle(300);
  });
});