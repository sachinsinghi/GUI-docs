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


		// //demo button
		// var $demobtn = $('<button/>')
		// 	.attr('type', 'button')
		// 	.addClass('btn btn-sm btn-link iframedemo-btn js-demo')
		// 	.append('<span class="iframedemo-btn-open"><span class="btn-text">Demo</span> <span class="btn-icon icon icon-size-sm icon-new-window"></span></span>')
		// 	.append('<span class="iframedemo-btn-close"><span class="btn-text">Close</span> <span class="btn-icon icon icon-size-sm icon-close"></span></span>')
		// 	.on('click', function() {
		// 		App.debugging( 'iFrame: demo button clicked', 'interaction' );

		// 		var $iframedemow = $(this).parents('.js-iframedemo-wrapper');
		// 		var $iframedemo = $(this).parents('.js-iframedemo');
		// 		var $iframe = $iframedemow.find('.js-iframe');
		// 		var _isOpen = $iframedemow.hasClass('is-open');
		// 		var width = $iframedemow.width();
		// 		var height = $iframedemow.height();
		// 		var $ani = $('<div/>')
		// 			.addClass('iframedemo-ani');

		// 		if( _isOpen ) { //CLOSING
		// 			$iframedemow.removeClass('is-open is-opening');

		// 			var src = $iframe.attr('src');
		// 			$iframe.attr('src', src.replace('/demo/', '/example/'));

		// 			$('.js-demo-resizer').removeClass('is-xs is-sm is-md is-lg').addClass('is-free');
		// 			$('.js-demo-btn').prop('checked', false);
		// 			$('.js-body').removeClass('has-demo');
		// 			$('.js-demo-resizer').removeClass('has-transition');
		// 			$('.iframedemo-ani').remove();

		// 			$iframedemo.untrap();
		// 		}
		// 		else { //OPENING
		// 			var left = Math.floor( $iframedemow.offset().left ); //we flip the animation
		// 			var top = Math.floor( $iframedemow.offset().top - $(window).scrollTop() );

		// 			$iframedemow.addClass('is-opening'); //set iframe to opacity 0 and add transition

		// 			$ani.css({
		// 				top: top,
		// 				width: width,
		// 				height: height,
		// 				left: left,
		// 			});

		// 			$iframedemow.after( $ani ); //insert animmation div

		// 			var src = $iframe.attr('src');
		// 			$iframe.attr('src', src.replace('/example/', '/demo/'));

		// 			$('.iframedemo-ani').animate(
		// 				{
		// 					top: 0,
		// 					width: $(window).width(),
		// 					height: $(window).height(),
		// 					left: 0,
		// 				},
		// 				300,
		// 				function() {
		// 					App.debugging( 'iFrame: animation ended', 'report' ); //trigger after animation div tranition is done

		// 					$iframedemo.trap();
		// 					$iframedemo.focus(); //move the focus into the popup
		// 					$iframedemow.addClass('is-open'); //now show iframe div
		// 					$('.js-demo-resizer').width();
		// 					$('.js-demo-resizer').addClass('has-transition');
		// 				}
		// 			);

		// 			$('.js-body').addClass('has-demo'); //prevent body from scrolling now
		// 		}
		// 	});


		// //adding buttons to DOM
		// $('.js-iframe.js-iframe-controls:not(.js-rendered)')
		// 	.addClass('js-rendered')
		// 	.parent('.example-box')
		// 	.addClass('has-buttons iframedemo-example')
		// 	.wrap('<div class="example-box-wrapper js-example-box-wrapper"></div>')
		// 	.before( $demobtn );

		// //adding wrapper divs to DOM
		// $('.js-example-box-wrapper:not(.js-rendered)').each(function() {
		// 	$(this).addClass('js-rendered');

		// 	$(this).wrap('<div class="iframedemo-wrapper js-iframedemo-wrapper"><div class="iframedemo js-iframedemo" tabindex="0"></div></div>');

		// 	$(this).find('.example-box.has-buttons').wrap(
		// 		'<div class="demo-iframe-wrapper">' +
		// 			'<div class="js-demo-iframe demo-iframe">' +
		// 				'<div class="demo-resizer-wrapper">' +
		// 					'<div class="demo-resizer js-demo-resizer is-free">' +
		// 					'</div>' +
		// 				'</div>' +
		// 			'</div>' +
		// 		'</div>'
		// 	)
		// });
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