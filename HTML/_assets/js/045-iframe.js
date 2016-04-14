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
			var _hasControls = $a.hasClass('js-iframe-controls');
			var $iframe = $('<iframe/>')
				.addClass( 'example-box-iframe js-iframe' + (_hasControls ? ' js-iframe-controls' : '') )
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

			//iframe buttons
			var $buttons = $('<div/>')
				.addClass('iframebtn-wrapper')
				.append(
					'<button type="button" class="btn btn-sm btn-soft iframebtn js-iframebtn">xs</button> ' +
					'<button type="button" class="btn btn-sm btn-soft iframebtn js-iframebtn">sm</button> ' +
					'<button type="button" class="btn btn-sm btn-soft iframebtn js-iframebtn">md</button> ' +
					'<button type="button" class="btn btn-sm btn-soft iframebtn js-iframebtn">lg</button>'
				)
				.on('click', '.js-iframebtn', function() {
					App.debugging( 'iFrame: buttons clicked', 'interaction' );

					var $this = $(this);
					var _hasAlready = $this.hasClass('btn-hero');
					var $iframe = $this
						.parent('.iframebtn-wrapper')
						.next('.example-box')
						.find('.js-iframe');

					$this
						.parent('.iframebtn-wrapper')
						.find('.js-iframebtn')
						.removeClass('btn-hero');

					$iframe
						.removeClass('iframe-xs iframe-sm iframe-md iframe-lg');

					if( !_hasAlready ) {
						$this
							.addClass('btn-hero');

						$iframe
							.addClass( 'iframe-' + $this.text() );
					}
				}
			);

			$('.js-iframe.js-iframe-controls')
				.parent('.example-box')
				.addClass('has-buttons')
				.before( $buttons );

			//init iframe resizer
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