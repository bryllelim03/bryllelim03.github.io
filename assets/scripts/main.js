( function( $ ) {

	var Scrolling = {};

	Scrolling.init = function() {
		Scrolling.revealHidden();

		$( document ).on( 'scroll', function() {
			Scrolling.revealHidden();
		} );
	};

	Scrolling.revealHidden = function() {
		var scroll = ( $( window ).scrollTop() + $( window ).height() ) - 60;

		$( '.anmte' ).each( function() {
			if( scroll >= $( this ).offset().top ) {
				$( this ).find( '.a-left' ).removeClass( 'a-left' );
				$( this ).find( '.a-right' ).removeClass( 'a-right' );
				$( this ).find( '.a-top' ).removeClass( 'a-top' );
				$( this ).find( '.a-text-left' ).removeClass( 'a-text-left' );
				$( this ).find( '.a-text-right' ).removeClass( 'a-text-right' );
			}
		} );
	};

	$( window ).on( 'load', function() {
		$( '.loader' ).fadeOut().promise().done( function() {
			$( 'html, body' ).removeClass( 'lock-position' );
			setTimeout( 
				function() { 
					Scrolling.init(); 
				}, 500 );
		} );

		$( '.link-projects' ).on( 'click', function( e ) {
			e.preventDefault();
			$("html, body").animate({
		        scrollTop: $('#projects').offset().top - 30
		    }, 600);
		} );

		$( '.link-about' ).on( 'click', function( e ) {
			e.preventDefault();
			$("html, body").animate({
		        scrollTop: $('#about').offset().top - 30
		    }, 600);
		} );
	} );

} )( jQuery );