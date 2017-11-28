$(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 100) {
        $("#js-main-menu").addClass("isScroll");
    }
    else{
        $("#js-main-menu").removeClass("isScroll");
    }
});