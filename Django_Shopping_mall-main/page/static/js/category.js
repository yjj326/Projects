$(document).ready(function() {

  // 옵션 카테고리 클릭하여 열고 닫기

	var $options = $(".option-title");
	
	$options.each(function() {
		$(this).click(function() {
      if ($(this).hasClass("open")) {
        $(this).removeClass("open");
        $(this).parent().find("div").css("display", "none");
      } else {
        $(this).addClass("open");
        $(this).parent().find("div").css("display", "block");
      };
		});
  });
  
  // 상품 이미지 hover => Add to cart 버튼 나타나게 하기

  var $cartBtns = $(".add-cart");

  $cartBtns.each(function() {
    // 이미지 hover
    $(this).parent().hover(function() {
      $(this).find(".add-cart").animate({bottom: "0"}, "300ms");
    }, function() {
      $(this).find(".add-cart").animate({bottom: "-40px"}, "fast");
    });

    // 클릭시 추가
    $(this).click(function() {
      var addCart = confirm("장바구니에 추가하시겠습니까?");
      if (addCart) {
        alert("장바구니에 추가되었습니다");
      }
    });
  });

  // 작은 이미지 hover => 장바구니 버튼 나타나게 하기

  var $smCartBtns = $(".sm-add-cart");

  $smCartBtns.each(function() {
    $(this).parent().hover(function() {
      $(this).find(".sm-add-cart").fadeIn("fast");
    }, function() {
      $(this).find(".sm-add-cart").fadeOut("fast");
    });
    // 클릭시 추가
    $(this).click(function() {
      var addCart = confirm("장바구니에 추가하시겠습니까?");
      if (addCart) {
        alert("장바구니에 추가되었습니다");
      }
    });
  });

  // 위시리스트 추가, 삭제

  var $wishBtns = $(".wish-btn");

  $wishBtns.each(function() {
    $(this).click(function() {
      if ($(this).hasClass("added") == false) {
        var addWish = confirm("위시리스트에 이 상품을 등록하시겠습니까?");
        if (addWish) {
          // 위시리스트 등록 처리
          alert("위시리스트에 등록되었습니다.");
          $(this).addClass("added");
          console.log("추가");
        }
      } else {
        var cancelWish = confirm("위시리스트에서 이 상품을 삭제하시겠습니까?");
        if (cancelWish) {
          alert("위시리스트에서 삭제되었습니다.");
          $(this).removeClass("added");
        }
      };
    });
  });
});