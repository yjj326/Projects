$(document).ready(function() {

  // 이미지 hover시 카트에 추가하는 버튼 나타나도록

  var $cartBtns = $(".add-cart");

  $cartBtns.each(function() {
    // 이미지 hover
    $(this).parent().hover(function() {
      $(this).find(".add-cart").animate({bottom: "0"}, "300ms");
    }, function() {
      $(this).find(".add-cart").animate({bottom: "-40px"}, "fast");
    });

  });

  // 위시리스트에서 삭제하기

  var $wishBtns = $(".add-wishlist");

  $wishBtns.each(function() {
    $(this).click(function() {
      var checkProduct = $(".list-item").length;
      var cancelWish = confirm("위시리스트에서 이 상품을 삭제하시겠습니까?");
      if (cancelWish && checkProduct > 1) {
        $(this).parent().parent().remove();
      } else if (cancelWish && checkProduct == 1) {
        emptyContent();
      };
    });
  });

  // 위시리스트에 상품이 더 없을 경우 문구 띄우기

  function emptyContent() {
    var wishlistContent = $(".wishlist-items");
    wishlistContent.empty();
    wishlistContent.html("<p class='no-product'>위시리스트에 담긴 상품이 없습니다.</p>");
  }

});