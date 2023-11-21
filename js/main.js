/** 
 * ===================================================================
 * main js
 *
 * ------------------------------------------------------------------- 
 */ 

(function($) {

	"use strict";

	/*---------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */ 
   $(window).load(function() {

      // will first fade out the loading animation 
    	$("#loader").fadeOut("slow", function(){

        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");

      });       

  	})


  	/*---------------------------------------------------- */
  	/* FitText Settings
  	------------------------------------------------------ */
  	setTimeout(function() {

   	$('#intro h1').fitText(1, { minFontSize: '42px', maxFontSize: '84px' });

  	}, 100);


	/*---------------------------------------------------- */
	/* FitVids
	------------------------------------------------------ */ 
  	$(".fluid-video-wrapper").fitVids();


	/*---------------------------------------------------- */
	/* Owl Carousel
	------------------------------------------------------ */ 
	$("#owl-slider").owlCarousel({
        navigation: false,
        pagination: true,
        itemsCustom : [
	        [0, 1],
	        [700, 2],
	        [960, 3]
	     ],
        navigationText: false
    });


	/*----------------------------------------------------- */
	/* Alert Boxes
  	------------------------------------------------------- */
	$('.alert-box').on('click', '.close', function() {
	  $(this).parent().fadeOut(500);
	});	


	/*----------------------------------------------------- */
	/* Stat Counter
  	------------------------------------------------------- */
   var statSection = $("#stats"),
       stats = $(".stat-count");

   statSection.waypoint({

   	handler: function(direction) {

      	if (direction === "down") {       		

			   stats.each(function () {
				   var $this = $(this);

				   $({ Counter: 0 }).animate({ Counter: $this.text() }, {
				   	duration: 4000,
				   	easing: 'swing',
				   	step: function (curValue) {
				      	$this.text(Math.ceil(curValue));
				    	}
				  	});
				});

       	} 

       	// trigger once only
       	this.destroy();      	

		},
			
		offset: "90%"
	
	});	


	/*---------------------------------------------------- */
	/*	Masonry
	------------------------------------------------------ */
	var containerProjects = $('#folio-wrapper');

	containerProjects.imagesLoaded( function() {

		containerProjects.masonry( {		  
		  	itemSelector: '.folio-item',
		  	resize: true 
		});

	});


	/*----------------------------------------------------*/
	/*	Modal Popup
	------------------------------------------------------*/
   $('.item-wrap a').magnificPopup({

      type:'inline',
      fixedContentPos: true,
      removalDelay: 300,
      showCloseBtn: true,
      mainClass: 'mfp-fade'

   });

   $(document).on('click', '.popup-modal-dismiss', function (e) {
   	e.preventDefault();
   	$.magnificPopup.close();
   });

	
	/*-----------------------------------------------------*/
  	/* Navigation Menu
   ------------------------------------------------------ */  
   var toggleButton = $('.menu-toggle'),
       nav = $('.main-navigation');
	   var menuElement = document.getElementById('row-top-bar');

   // toggle button
   toggleButton.on('click', function(e) {
    e.preventDefault();

    toggleButton.toggleClass('is-clicked');
    
    if (toggleButton.hasClass('is-clicked')) {
        menuElement.style.transition = 'background 0.3s ease'; // Tempo de transição para 0.3 segundos
        menuElement.style.background = '#000'; // Cor de fundo #000
    } else {
        menuElement.style.transition = 'background 1s ease'; // Tempo de transição para 1 segundo
        menuElement.style.background = '#00000000'; // Cor de fundo #00000000
    }

    nav.slideToggle();
});


   // nav items
  	nav.find('li a').on("click", function() {   

   	// update the toggle button 		
   	toggleButton.toggleClass('is-clicked'); 
   	// fadeout the navigation panel
   	nav.fadeOut();   
	menuElement.style.background = '#00000000';		
   	     
  	});

	/*-----------------------------------------------------*/
  	/* Scroll Fade Menu
   ------------------------------------------------------ */  

   window.addEventListener('scroll', function() {
	// Verifica se o dispositivo é grande (não um celular)
	if (window.innerWidth > 768) {
	  var menuElement = document.getElementById('row-top-bar');
	  var heightToChange = window.innerHeight - 300; // 100vh ajustado
  
	  if (window.scrollY > heightToChange) {
		menuElement.style.background = '#000'; // Cor após rolar 100vh
	  } else {
		menuElement.style.background = '#00000000'; // Cor original
	  }
	}
  });
  
  // Define a cor de fundo para #000 em dispositivos menores (celulares) sem esperar pelo evento de rolagem
  if (window.innerWidth <= 768) {
	var menuElement = document.getElementById('row-top-bar');
	menuElement.style.background = '#000';
  }
  
  


   /*---------------------------------------------------- */
  	/* Highlight the current section in the navigation bar
  	------------------------------------------------------ */
	var sections = $("section"),
	navigation_links = $("#main-nav-wrap li a");	

	sections.waypoint( {

       handler: function(direction) {

		   var active_section;

			active_section = $('section#' + this.element.id);

			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');			

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		}, 

		offset: '25%'
	});


	/*---------------------------------------------------- */
  	/* Smooth Scrolling
  	------------------------------------------------------ */
  	$('.smoothscroll').on('click', function (e) {
	 	
	 	e.preventDefault();

   	var target = this.hash,
    	$target = $(target);

    	$('html, body').stop().animate({
       	'scrollTop': $target.offset().top
      }, 800, 'swing', function () {
      	window.location.hash = target;
      });

  	});  
  

   /*---------------------------------------------------- */
	/*  Placeholder Plugin Settings
	------------------------------------------------------ */ 
	$('input, textarea, select').placeholder()  




 	/*----------------------------------------------------- */
  	/* Back to top
   ------------------------------------------------------- */ 
	var pxShow = 300; // height on which the button will show
	var fadeInTime = 400; // how slow/fast you want the button to show
	var fadeOutTime = 400; // how slow/fast you want the button to hide
	var scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

   // Show or hide the sticky footer button
	jQuery(window).scroll(function() {

		if (!( $("#header-search").hasClass('is-visible'))) {

			if (jQuery(window).scrollTop() >= pxShow) {
				jQuery("#go-top").fadeIn(fadeInTime);
			} else {
				jQuery("#go-top").fadeOut(fadeOutTime);
			}

		}		

	});		


	/*----------------------------------------------------- */
  	/* Copy email and phone-number
   ------------------------------------------------------- */ 

   function copyToClipboard(elementId) {
    // Cria um campo de texto temporário
    var textField = document.createElement('textarea');
    textField.innerText = document.getElementById(elementId).innerText;
    document.body.appendChild(textField);

    // Seleciona o texto dentro do campo de texto
    textField.select();
    textField.setSelectionRange(0, 99999); // Para compatibilidade com dispositivos móveis

    // Copia o texto selecionado
    document.execCommand('copy');

    // Remove o campo de texto temporário
    document.body.removeChild(textField);

    // Opcional: feedback para o usuário
    alert('Texto copiado: ' + textField.innerText);
  }

  document.getElementById('email-copy').addEventListener('click', function() {
    copyToClipboard('email-copy');
  });

  document.getElementById('number-copy').addEventListener('click', function() {
    copyToClipboard('number-copy');
  });

})(jQuery);