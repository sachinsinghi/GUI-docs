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

		//link to iframe conversion
		var $iframes = $section.find('a.js-iframelink');

		$iframes.each(function() { //replace links with iframes
			var $anchor = $(this);
			var src = $anchor.attr('href');
			var _hasControls = $anchor.hasClass('js-iframe-controls');
			var $iframe = $('<iframe/>')
				.addClass( 'example-box-iframe js-iframe' + (_hasControls ? ' js-iframe-controls' : '') )
				.attr('src', src);

			$anchor.replaceWith( $iframe );
		});

	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function() {
		App.debugging( 'iFrame: Initiating', 'report' );

		if( $('.js-iframe').length ) {
			App.debugging( 'iFrame: Initiating: Found ' + $('.js-iframe').length + ' instances', 'report' );

			App.iframe.render( $('.js-body') );

			//init iframe resizer
			var isOldIE = (navigator.userAgent.indexOf("MSIE") !== -1); // Detect IE10 and below

			$('.js-iframe')
				.attr('scrolling', 'no') //no-js fallback
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