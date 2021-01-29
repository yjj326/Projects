function copyToClipboard(elementId) {
    var aux = document.createElement("input");
    aux.setAttribute("value", document.getElementById(elementId).innerHTML);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    alert("복사되었습니다.")
}



$(document).ready(function () {
    $("li").each(function () {
        $(this).click(function () {
            $(this).addClass("on");
            $(this).siblings().removeClass("on");
        })
    })
})

$(document).ready(function () {
    $(".entire-content-1").on("click", function () {
        $(".contents-1").slideToggle("fast");
    })

    $(".entire-content-2").on("click", function () {
        $(".contents-2").slideToggle("fast");
    })

    $(".entire-content-3").on("click", function () {
        $(".contents-3").slideToggle("fast");
    })

    $(".entire-content-4").on("click", function () {
        $(".contents-4").slideToggle("fast");
    })

    $(".entire-content-5").on("click", function () {
        $(".contents-5").slideToggle("fast");
    })

    $(".entire").on("click", function () {
        $(".E").removeClass("h");
    })

    $(".order-payment").on("click", function () {
        $(".E").removeClass("h");
        $(".C").addClass("h");
    })

    $(".exchange").on("click", function () {
        $(".E").removeClass("h");
        $(".O").addClass("h");
    })


})