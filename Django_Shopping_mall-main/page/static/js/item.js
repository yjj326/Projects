$(document).ready(function() {

  // 위시리스트 추가

  $(".wish-list-btn").click(function() {
    $(this).toggleClass("clicked");
    if ($(this).hasClass("clicked")) {
      alert("위시리스트에 추가되었습니다");
    } else alert("위시리스트에서 삭제되었습니다");
  });

  // 클릭 시 큰 이미지로 띄우기

  var $smImg = $(".sm-img");
  var selectedImg;

  $smImg.each(function() {
    $(this).click(function() {
      if (!($(this).hasClass("active"))) {
        selectedImg = $(this).attr("src");
        $(".big-img").attr("src", selectedImg);
        $smImg.each(function() {
          $(this).removeClass("active")
        });
        $(this).addClass("active");
      }
    });
  });

  // 탭 메뉴 전환 (상품 정보, 리뷰)

  var $tabList = $(".product-nav").find("li");
  var $tabContent = $(".tab-content").find(".div");

  $tabList.each(function() {
    $(this).click(function() {
      if ($(this).hasClass("selected") == false) {
        var index = $(this).index();
        $tabList.each(function() {
          $(this).removeClass("selected");
        });
        $(this).addClass("selected");
        $tabContent.each(function() {
          if ($(this).index() == index) {
            $(this).css("display", "block");
            console.log($(this).index());
          }
          if ($(this).index() != index) {
            $(this).css("display", "none");
          }
        });
      }
    });
  });

});