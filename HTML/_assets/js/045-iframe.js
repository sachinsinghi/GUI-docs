/***************************************************************************************************************************************************************
 *
 * iframe sizing
 *
 **************************************************************************************************************************************************************/


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


(function(App) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Iframe render
	//
	// @param  $section  {jQuery object}  jQuery object of DOM element with possible iframes
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.render = function( $section ) {
		App.debugging( 'iFrame: render running', 'report' );

		var $iframes = $section.find('a.js-iframelink');

		$iframes.each(function() {
			var $a = $(this);
			var src = $a.attr('href');
			var $iframe = $('<iframe/>')
				.addClass('example-box-iframe js-iframe')
				.attr('src', src);

			$a.replaceWith( $iframe );
		});

		if( $iframes.length ) {
			App.debugging( 'iFrame: render: Found ' + $iframes.length + ' instances', 'report' );

			App.iframe.init();
		}
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function() {
		App.debugging( 'iFrame: Initiating', 'report' );

		if( $('.js-iframe').length ) {
			App.debugging( 'iFrame: Found instance', 'report' );

			var isOldIE = (navigator.userAgent.indexOf("MSIE") !== -1); // Detect IE10 and below

			$('.js-iframe')
				.attr('scrolling', 'no')
				.iFrameResize({
					minHeight: 190,
					bodyMargin: 0,
					heightCalculationMethod: isOldIE ? 'max' : 'lowestElement',
				}
			);
		}
	};


	App.iframe = module;


}(App));


// start the module
App.iframe.init();