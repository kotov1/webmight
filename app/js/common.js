/* Custom scripts */

"use strict";

$(function() {

	// bootsrap scrollspy
	// $('body').scrollspy({ target: '.navbar-collapse' })

	// Mobile menu
	$(".navbar__menu").click(function() {
		$(this).toggleClass("navbar__menu--expanded");
	});
	$(window).resize(function() {
		$('.navbar__menu').removeClass("navbar__menu--expanded");
	});

	// animsition
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 2000,
        outDuration: 1000,
        linkElement: '.animsition-link',
        loading: true,
        loadingParentElement: 'body',
        loadingClass: 'animsition-loading',
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: ['animation-duration', '-webkit-animation-duration'],
        overlay: false,
        overlayClass: 'animsition-overlay-slide',
        overlayParentElement: 'body',
        transition: function (url) {
            window.location.href = url;
        }
    });

    // porfolio filtration
        // automatic counting number of works in category and putting value in <sub> tag
    var countLandings = countMultipages = countEdits = countTurnkeys = countShops= 0;
    $('.portfolio__works .mix').each(function(i, el) {
        if($(el).hasClass('landings')) ++countLandings;
        if($(el).hasClass('multipages')) ++countMultipages;
        if($(el).hasClass('edits')) ++countEdits;
        if($(el).hasClass('turnkeys')) ++countTurnkeys;
        if($(el).hasClass('shops')) ++countTurnkeys;
    });
    $('.displaySup__landings').text(countLandings);
    $('.displaySup__multipages').text(countMultipages);
    $('.displaySup__edits').text(countEdits);
    $('.displaySup__turnkeys').text(countTurnkeys);
    $('.displaySup__shops').text(countShops);

        // if value of works in category equal to 0, adding disable class
    $('.displaySup').each(function(i, el) {
        if($(el).text() == 0) {
          $(el).parent('.portfolio__filter').addClass('portfolio__filter--disabled');
        }
    });
        // if filter have disable class, restricting click
    $(".portfolio__filter").not('.portfolio__filter--disabled').click(function() {
        $(".portfolio__filter").not('.portfolio__filter--disabled').children().fadeOut(1e3);
        $(this).children().fadeIn(1e3)
    });


// rotating gears with page scroll
    $(window).scroll(function() {
        var theta = $(window).scrollTop() / 50 % Math.PI;
        $('.page__gear--left').css({ transform: 'rotate(' + theta + 'rad)' });
        $('.page__gear--right').css({ transform: 'rotate(-' + theta + 'rad)' });
    });


});



var containerEl = document.querySelector('#container-mixItUp');
var mixer = mixitup(containerEl);

var typed = new Typed("#js-typed", {
	stringsElement: '.typed-strings',
	typeSpeed: 50,
	backSpeed: 30,
	backDelay: 1000,
	startDelay: 2000,
	loop: true
});