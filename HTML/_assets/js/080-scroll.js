/***************************************************************************************************************************************************************
 *
 * Scroll listener
 *
 **************************************************************************************************************************************************************/


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


(function(App) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// private function: Check position
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	function checkPos() {
		App.debugging( 'Scroll: Running checkPos', 'report' );

		var scroll = $(window).scrollTop();

		if(scroll > 89) { //header headline
			// App.debugging( 'Scroll: checkPos: Passed 89px', 'report' );

			$('.js-body').addClass('has-halfScrolledContent');
		}
		else {
			// App.debugging( 'Scroll: checkPos: Below 89px', 'report' );

			$('.js-body').removeClass('has-halfScrolledContent');
		}


		if(scroll > 192) { //header
			// App.debugging( 'Scroll: checkPos: Passed 192px', 'report' );

			$('.js-body').addClass('has-scrolledContent');
		}
		else {
			// App.debugging( 'Scroll: checkPos: Below 192px', 'report' );

			$('.js-body').removeClass('has-scrolledContent');
		}


		if(scroll > 600) { //footer
			// App.debugging( 'Scroll: checkPos: Passed 600px', 'report' );

			$('.js-body').addClass('has-scrolledContentFooter');
		}
		else {
			// App.debugging( 'Scroll: checkPos: Below 600px', 'report' );

			$('.js-body').removeClass('has-scrolledContentFooter');
		}


		$('.js-body').removeClass('has-openSidebar'); //closing menu
	};



	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function() {
		App.debugging( 'Scroll: Initiating', 'report' );

		//////////////////////////////////////////////////| SCROLL THROTTLER
		$(window).on('scroll', GUI.throttle(checkPos, 30) );

		checkPos();

		//////////////////////////////////////////////////| SCROLL TO TOP BUTTON LISTENER
		$('.js-scrollToTop').on('click', function(e) {
			App.debugging( 'Scroll: Scroll to top button clicked', 'interaction' );

			e.preventDefault();
			$('html, body').animate({
				scrollTop: 0 },
				300
			);
		});
	};


	App.scroll = module;


}(App));


// start the module
App.scroll.init();