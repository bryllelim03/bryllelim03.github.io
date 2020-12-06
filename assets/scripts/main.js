( function( $ ) {
	var Viewport = {};

	Viewport.documentWidth = function(){
	 var e = window, a = 'inner';
	  if (!('innerWidth' in window )) {
	      a = 'client';
	      e = document.documentElement || document.body;
	  }
	  return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
	};


	var Nav = {
		content: $( '.nav-loader' ),
		contentTl: new TimelineMax( { paused: true } ),
		burger: $( '.burger' ),
		burgerTl: new TimelineMax( { paused: true } ),
		burgerShowTl: new TimelineMax( { paused: true } ),
		loader: $( '.loader' ),
		loaderTl: new TimelineMax( { paused: false, repeat:-1 } )
	};

	Nav.init = function() {
		Nav.loaderAnimation();
		Nav.contentAnimation();
		Nav.burgerShowAnimation();
		Nav.burgerClickAnimation();
	};

	Nav.loaderAnimation = function() {
		Nav.loaderTl.staggerFromTo( $( 'span', Nav.loader ), 0.6, { x: '-100%' }, { x: '100%', ease:Power2.easeInOut }, 0.2 );
	};

	Nav.contentAnimation = function() {
		Nav.contentTl.staggerFromTo( $( '.js-animate-navText' ), 0.4, { y:0, autoAlpha: 1 }, { y:30, autoAlpha: 0 }, -0.2, -0.2 );
		Nav.contentTl.to( Nav.content, 0.2, { height: '2px', ease:Power2.easeIn }, 0.6 );
		Nav.contentTl.fromTo( Nav.content, 0.6, { x: '0%' }, { x: '-100%', autoAlpha: 0, ease:Power2.easeInOut }, 1 );
	};

	Nav.burgerShowAnimation = function() {
		Nav.burgerShowTl.to( $( '.burger' ), 0.2, { autoAlpha: 1 }, 0 );
	};

	Nav.burgerClickAnimation = function() {
		// Burger btn Slide-out from scene
		Nav.burgerTl.staggerFromTo( $( 'span:not(:nth-child(4)):not(:nth-child(5))', Nav.burger ), 0.2, { x: 0 }, { x: 100 }, 0.1 );

		// Close btn Slide-in from scene
		Nav.burgerTl.to( $( 'span:nth-child(4)', Nav.burger ), 0.2, { top: 0 }, 1 );
		Nav.burgerTl.to( $( 'span:nth-child(5)', Nav.burger ), 0.2, { left: 0 }, 1 );

		// Close btn rotate
		Nav.burgerTl.fromTo( $( 'span:nth-child(4)', Nav.burger ), 0.2, { rotation:90 }, { rotation:45 }, 1.2 );
		Nav.burgerTl.to( $( 'span:nth-child(5)', Nav.burger ), 0.2, { rotation:-45 }, 1.2 );
	};


	var ProjectWrap = {
		isWrapped: false,
		isWrappedDesktop: false,
		isWrappedMobile: false,
		projectdivs: $( '.list__col' )
	};

	ProjectWrap.windowWidthChecker = function() {
		if( Viewport.documentWidth().width >= 768 ) {
			if( ProjectWrap.isWrappedDesktop == false ) {
				ProjectWrap.desktop();
			}
		} else {
			if( ProjectWrap.isWrappedMobile == false ) {
				ProjectWrap.mobile();
			}
		}
	};

	ProjectWrap.desktop = function() {
		$( '.list__col' ).unwrap( '.list__group' );
		for(var i = 0; i < ProjectWrap.projectdivs.length; i+=3) {
		  ProjectWrap.projectdivs.slice(i, i+3).wrapAll( '<div class="list__group"></div>' );
		}	

		ProjectWrap.isWrappedDesktop = true;
		ProjectWrap.isWrappedMobile = false;
		$( '.list__group' ).first().addClass( 'is-shown' );
	};

	ProjectWrap.mobile = function() {
		$( '.list__col' ).unwrap( '.list__group' );
		for(var i = 0; i < ProjectWrap.projectdivs.length; i+=1) {
		  ProjectWrap.projectdivs.slice(i, i+1).wrapAll( '<div class="list__group"></div>' );
		}

		ProjectWrap.isWrappedDesktop = false;
		ProjectWrap.isWrappedMobile = true;	
		$( '.list__group' ).first().addClass( 'is-shown' );
	};


	var Projects = {
		project: $( '.list__col' )
	};

	Projects.init = function() {
		Projects.splitText();
		// Projects.animation();
	};

	Projects.splitText = function() {

		$('.list__title').each(function() {
			var words = $(this).text().split(' ');

			var $title = $( this );
			$title.empty();

			$.each( words, function( i, word ) {
				var setWord;

				if( i !== words.length - 1 ) {
					setWord = '<div>' + word + '</div>' + '<div>&nbsp;</div>';
				} else {
					setWord = '<div>' + word + '</div>';
				}

	    	$title.append(setWord);
			} );
		});

		$( '.list__title div' ).each( function() {
	    var characters = $( this ).text().split( '' );
	    
	    var $words = $( this );
	    $words.empty();

	    $.each( characters, function( i, char ) {
	    	if( char === ' ' ) {
	    		char = '&nbsp;';
	    	}

	    	$words.append('<span>' + char + '</span>');
	    } );
		} );
	};

	Projects.animation = function( projectShown, isScrollDown ) {
		var projectTl = new TimelineMax();
		var $listCol = $( '.list__col', projectShown );
		// var $listImgBlocker = $( '.list__img-blocker', projectShown );
		var $listImg = $( '.list__img', projectShown );
		var $listText = $( '.list__text', projectShown );
		var $listTitle = $( '.list__title', projectShown );
		var $listTitleChar = $( '.list__title span', projectShown );
		var $listType = $( '.list__type', projectShown );
		var $listOwner = $( '.list__owner', projectShown );
		var isScrollingDown = isScrollDown;
		var yPos;

		if( isScrollingDown == true ) {
			yPos = 80;
		} else {
			yPos = -80;
		}

		projectTl.staggerTo( $listImg, 0.5, { autoAlpha: 1 }, 0.2, 0 );
		projectTl.staggerFromTo( $listCol, 0.5, { y: yPos }, { y:0, ease:Power1.easeOut, clearProps:"scale" }, 0.2, 0 )
		// projectTl.staggerFromTo( $listImgBlocker, 0.5, { left: '-100%' }, { left: '100%' }, 0.2, 0.4 );
		projectTl.staggerFromTo( $listImg, 0.5, { '-webkit-filter': 'grayscale(100%)', 'filter': 'grayscale(100%)' }, { '-webkit-filter': 'grayscale(0%)', 'filter': 'grayscale(0%)' }, 0.2, 0.7 );
		projectTl.staggerFrom( $listText, 0.1, { 'background': 'none' }, 0.2, 0 );
		projectTl.staggerTo( $listTitle, 0.5, { autoAlpha: 1 }, 0.2, 0.7 );
		projectTl.staggerFromTo( $listTitleChar, 0.6, { cycle: { y: [20, -40, 30, 13, -30 ] }, autoAlpha: 0 }, { y: 0, x:0, autoAlpha: 1 }, 0.01, 0.7 );
		projectTl.staggerFromTo( $listType, 0.4, { x: -30, autoAlpha: 0 }, { x: 0, autoAlpha: 1 }, 0.2, 1 );
		projectTl.staggerFromTo( $listOwner, 0.4, { x: -30, autoAlpha: 0 }, { x: 0, autoAlpha: 1 }, 0.2, 1.1 );
	};

	Projects.hoverAnimation = function() {
		$( '.list__img' ).hover( function() {
			TweenMax.to( $( this ), 1, { scale: 1.1 }, 0 );
		}, function() {
			TweenMax.to( $( this ), 1, { scale: 1 }, 0 );
		} );
	};


	var ScrollIndicator = {
		scrollIndicator: $( '.scroll-indicator' ),
		scrollIndicatorTl: new TimelineMax( { repeat:-1 } )
	};

	ScrollIndicator.init = function() {
		ScrollIndicator.animation();
	};

	ScrollIndicator.animation = function() {
		ScrollIndicator.scrollIndicatorTl.to( $( 'span', ScrollIndicator.scrollIndicator ), 0.2, { autoAlpha: 1 }, 0 );
		ScrollIndicator.scrollIndicatorTl.to( $( 'span', ScrollIndicator.scrollIndicator ), 0.5, { top: 15, autoAlpha: 0 }, 1 );
	};

	ScrollIndicator.checker = function() {
		if( $( '.list__group.is-shown' ).next( '.list__group' ).length > 0 ) {
			ScrollIndicator.scrollIndicator.fadeIn();
		} else {
			ScrollIndicator.scrollIndicator.fadeOut();
		}
	};

	

	// Initialize
	ProjectWrap.windowWidthChecker();
	Nav.init();
	Projects.init();
	ScrollIndicator.init();

	
	$( window ).on( 'load', function() {

		Nav.contentTl.staggerTo( '.social-list li', 0.2, { autoAlpha: 0 }, -0.2, 0 );
		Nav.burgerClick = function() {

			Nav.burger.on( 'click', function() {
				if( !$( this ).hasClass( 'is-active' ) ) {
					$( this ).addClass( 'is-active' );
					Nav.burgerTl.play();
					Nav.contentTl.reverse();
				} else {
					$( this ).removeClass( 'is-active' );
					Nav.burgerTl.reverse();
					Nav.contentTl.play();
				}
			} );
		};

		var Scrolling = {
			scrollTl: new TimelineMax(),
			scrollValue: 0,
			isScrollDown: true
		};

		Scrolling.down = function() {
		  if( $( '.list__group.is-shown' ).next( '.list__group' ).length > 0 ) {
  			Scrolling.scrollValue += -$( '.list__group.is-shown' ).next().offset().top;
  			$( '.list__group.is-shown' ).removeClass( 'is-shown' ).next().addClass( 'is-shown' );

  			Scrolling.isScrollDown = true;
  			Projects.animation( $( '.list__group.is-shown' ), Scrolling.isScrollDown );
  		}
		};

		Scrolling.up = function() {
			if( $( '.list__group.is-shown' ).prev( '.list__group' ).length > 0 ) {
				Scrolling.scrollValue -= $( '.list__group.is-shown' ).prev().offset().top;
				$( '.list__group.is-shown' ).removeClass( 'is-shown' ).prev().addClass( 'is-shown' );

				Scrolling.isScrollDown = false
				Projects.animation( $( '.list__group.is-shown' ), Scrolling.isScrollDown );
			}
		};

		Scrolling.scrollY = function( scrollValue ) {
	    Scrolling.scrollTl.to( '.list', 0.5, { y:scrollValue, ease:Power2.easeInOut } );
		};

		$( '.list' ).on( 'swipeup', function( ) {
			if( !Scrolling.scrollTl.isActive() ) {
				Scrolling.down();

				Scrolling.scrollY( Scrolling.scrollValue );
		    ScrollIndicator.checker();
			}
		} ).on( 'swipedown', function() {
			if( !Scrolling.scrollTl.isActive() ) {
				Scrolling.up();
				
				Scrolling.scrollY( Scrolling.scrollValue );
		    ScrollIndicator.checker();
			}
		} );

		var isScrolling = 0;

		$( window ).bind( 'wheel', function( e ) {
    	if( isScrolling == 0 ) {
    		isScrolling = 1;
    		if( e.originalEvent.deltaY >= 0 ) {
	    		//scrolling down
	    		Scrolling.down();
		    }
		    else {
		    	//scrolling up
		    	Scrolling.up();
		    }

		    Scrolling.scrollY( Scrolling.scrollValue );
		    ScrollIndicator.checker();
    		
    		setTimeout( function() { 
    			isScrolling = 0;
    		}, 2200 );
    	}
		} );

		setTimeout( function() {
			Nav.contentTl.play();
			Nav.loaderTl.to( Nav.loader, 0.2, { autoAlpha: 0 }, 0 );
		}, 1600 );

		setTimeout( function() {
			Nav.burgerShowTl.play();
			Nav.burgerClick();
			Projects.hoverAnimation();
			Projects.animation( $( '.list__group.is-shown' ), true );
			Nav.loaderTl.kill();
			$( '.social-list' ).show();
		}, 2400 );

		$( window ).resize( function() {
			ProjectWrap.windowWidthChecker();
		} );
	} );
} )( jQuery );