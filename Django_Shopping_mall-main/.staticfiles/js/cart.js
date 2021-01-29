$(document).ready(function() {

  // 총 상품 금액, 배송비, 결제금액 띄우기

  var totalProductPrice;
  var shippingFee;
  var totalPrice;

  summary();

  function summary() {
    totalProductPrice = 0;
    shippingFee = 0;
    totalPrice = 0;
    $(".total-item-price").each(function() {
      var price = uncomma($(this).text());
      totalProductPrice += parseInt(price);
    });
    if (totalProductPrice <= 300000) {
      shippingFee = 50000;
    }
    totalPrice = totalProductPrice + shippingFee;
    $(".total-products-price").text(comma(totalProductPrice));
    $(".shipping-fee").text(comma(shippingFee));
    $(".total-price").text(comma(totalPrice));
  }

  // 상품 수량 변경 시 상품 총 금액 변경하기

  var quantity;
  var itemPrice;
  var totalItemPrice;

  $(".cart-item-quantity").each(function() {
    $(this).change(function() {
      quantity = $(this).val();
      itemPrice = uncomma($(this).parent().parent().find(".item-price").text());
      totalItemPrice = parseInt(quantity) * parseInt(itemPrice);
      $(this).parent().parent().find(".total-item-price").text(comma(totalItemPrice));
      summary();
    });
  });

  // 텍스트에 콤마 넣기, 가져온 텍스트에서 콤마 제거하기

  function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
  }

  function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
  }

  // 삭제 버튼 클릭 시 해당 항목 삭제하기

  var remove;
  var countTbody;

  $(".cart-item button").each(function() {
    $(this).click(function() {
      var checkProduct = $("tbody").length;
      remove = confirm("이 상품을 장바구니에서 삭제하시겠습니까?");
      if (remove && checkProduct > 1) {
        $(this).parent().parent().parent().remove();
        summary();
      } else if (remove && checkProduct == 1) {
        emptyContent();
        summary();
        // DB 반영 필요
      }
    });
  });

  // 더 이상 상품이 남아있지 않을 때 문구 띄우기

  function emptyContent() {
    var cartContent = $(".cart-content");
    cartContent.empty();
    cartContent.html("<p class='no-product'>장바구니에 담긴 상품이 없습니다.</p>");
  }
});