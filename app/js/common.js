/* Custom scripts */


$(function() {

	"use strict";

	// Mobile menu
	$(".navbar__menu").click(function() {
		$(this).toggleClass("navbar__menu--expanded");
	});
	$(window).resize(function() {
		$('.navbar__menu').removeClass("navbar__menu--expanded");
	});


	// porfolio filtration

	// automatic counting number of works in category and putting value in <sub> tag
	var countAll = 0;
	var countLandings = 0;
	var countMultipages = 0;
	var countEdits = 0;
	var countTurnkeys = 0;
    $('.portfolio__works .mix').each(function(i, el) {
        ++countAll;
        if($(el).hasClass('multipages')) ++countMultipages;
        if($(el).hasClass('landings')) ++countLandings;
        if($(el).hasClass('edits')) ++countEdits;
        if($(el).hasClass('turnkeys')) ++countTurnkeys;
	});
	
    $('.displaySup__all').text(countAll);
    $('.displaySup__landings').text(countLandings);
    $('.displaySup__multipages').text(countMultipages);
    $('.displaySup__edits').text(countEdits);
    $('.displaySup__turnkeys').text(countTurnkeys);


        // if filter have disable class, restricting click
    $(".portfolio__filter").not('.portfolio__filter--disabled').click(function() {
        $(".portfolio__filter").not('.portfolio__filter--disabled').children().fadeOut(1e3);
        $(this).children().fadeIn(1e3);
    });


	// rotating gears with page scroll
    $(window).scroll(function() {
        var theta = $(window).scrollTop() / 500 % Math.PI;
        $('.page__gear--left').css({ transform: 'rotate(' + theta + 'rad)' });
        $('.page__gear--right').css({ transform: 'rotate(-' + theta + 'rad)' });
	});

	// menu animated scroll
	$(".navbar__list").on("click","a", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
			top = $(id).offset().top - 100;
		$('body,html').animate({scrollTop: top}, 1000);
	});


	


});



var containerEl = document.querySelector('#container-mixItU');
var mixer = mixitup(containerEl, {
	load: {
		filter: '.multipages'
	  }
});

var typed = new Typed("#js-typed", {
	stringsElement: '.typed-strings',
	typeSpeed: 50,
	backSpeed: 30,
	backDelay: 1000,
	startDelay: 2000,
	loop: true
});