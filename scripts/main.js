$(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 100) {
        $("#js-main-menu").addClass("isScroll");
        $("#js-scroll-up").addClass("isShow");
    } else {
        $("#js-main-menu").removeClass("isScroll");
        $("#js-scroll-up").removeClass("isShow");
    }
});

$("#js-scroll-up").click(function () {
    $('html, body').animate({ scrollTop: 0 }, 500);
});


// Select all links with hashes
$('a[href*="#"]')
// Remove links that don't actually link to anything
.not('[href="#"]')
.not('[href="#0"]')
.click(function (event) {
    // On-page links
    if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname
    ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 75
            }, 1000, function () {
                // Callback after animation
                // Must change focus!
                var $target = $(target);
                $target.focus();
                if ($target.is(":focus")) { // Checking if the target was focused
                    return false;
                } else {
                    $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                    $target.focus(); // Set focus again
                };
            });
        }
    }
});

// Timer
var duration = { d: 10, h: 4, m: 50, s: 5 },
    sf = 120,
    maxD = 2,
    maxH = 24,
    maxM = 60,
    maxS = 60;

setInterval(function () {
    $('.d').html(duration.d);
    $('.h').html(duration.h);
    $('.m').html(duration.m)
        .attr('data-t', duration.m - 1);
    $('.s').html(duration.s)
        .attr('data-t', duration.s - 1);
    duration.s--;
    $('.s').addClass('flip');
    $('.m').removeClass('flip');
    $('.id .circle').css('stroke-dashoffset', sf - (duration.d * (sf / maxD)));
    $('.ih .circle').css('stroke-dashoffset', sf - (duration.h * (sf / maxH)));
    $('.im .circle').css('stroke-dashoffset', sf - (duration.m * (sf / maxM)));
    $('.is .circle').css('stroke-dashoffset', sf - (duration.s * (sf / maxS)));
    if (duration.s === 58) {
        $('.m').addClass('flip');
    }
    if (duration.s === 0) {
        duration.m--;
        duration.s = 59;
        if (duration.m === 0) {
            duration.h--;
            duration.m = 59
        }
    }
}, 1000);
