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

			//demo button
			var $demobtn = $('<button/>')
				.attr('type', 'button')
				.addClass('btn btn-sm btn-link iframedemo-btn js-demo')
				.append('<span class="iframedemo-btn-open"><span class="btn-text">Demo</span> <span class="btn-icon icon icon-size-sm icon-new-window"></span></span>')
				.append('<span class="iframedemo-btn-close"><span class="btn-text">Close</span> <span class="btn-icon icon icon-size-sm icon-close"></span></span>')
				.on('click', function() {
					App.debugging( 'iFrame: demo button clicked', 'interaction' );

					var $iframedemow = $(this).parents('.js-iframedemo-wrapper');
					var $iframedemo = $(this).parents('.js-iframedemo');
					var _isOpen = $iframedemow.hasClass('is-open');
					var width = $iframedemow.width();
					var height = $iframedemow.height();
					var $ani = $('<div/>')
						.addClass('iframedemo-ani');

					if( _isOpen ) { //CLOSING
						$iframedemow.removeClass('is-open is-opening');

						$('.js-demo-resizer').removeClass('is-xs is-sm is-md is-lg').addClass('is-free');
						$('.js-body').removeClass('has-demo');
						$('.iframedemo-ani').remove();

						$iframedemo.untrap();
					}
					else { //OPENING
						var X = $iframedemow.offset().left; //we flip the animation
						var Y = $iframedemow.offset().top - $(window).scrollTop();

						$iframedemow.addClass('is-opening'); //set iframe to opacity 0 and add transition

						$ani.css({ //FLIP animation
							transform: 'translateX(' + X + 'px) translateY(' + Y + 'px)',
							clip: 'rect(0, ' + width + 'px, ' + height + 'px, 0)',
						});

						$iframedemow.after( $ani ); //insert animmation div

						var $ani = $('.iframedemo-ani'); //cache reuse

						$ani.css('width'); //resetting layout engine

						$ani
							.addClass('is-opening')
							.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
								App.debugging( 'iFrame: transition end found', 'report' ); //trigger after animation div tranition is done

								if( !$iframedemow.hasClass('is-open') ) { //the event is triggered multiple times if we transition on multiple atributes
									$iframedemo.trap();
									$iframedemo.focus(); //move the focus into the popup
								}

								$iframedemow.addClass('is-open'); //now show iframe div
							});

						$('.js-body').addClass('has-demo'); //prevent body from scrolling now
					}
				});


			//adding buttons to DOM
			$('.js-iframe.js-iframe-controls')
				.parent('.example-box')
				.addClass('has-buttons iframedemo-example')
				.wrap('<div class="example-box-wrapper js-example-box-wrapper"></div>')
				.before( $demobtn );

			//adding wrapper divs to DOM
			$('.js-example-box-wrapper').each(function() {
				$(this).wrap('<div class="iframedemo-wrapper js-iframedemo-wrapper"><div class="iframedemo js-iframedemo" tabindex="0"></div></div>');

				$(this).find('.example-box.has-buttons').wrap(
					'<div class="demo-iframe-wrapper">' +
						'<div class="js-demo-iframe demo-iframe">' +
							'<div class="demo-resizer-wrapper">' +
								'<div class="demo-resizer js-demo-resizer is-free">' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>'
				)
			});

			//adding responsive buttons to DOM
			$('.js-iframedemo').prepend('<div class="row demo">' +
					'<div class="col-xs-7 col-sm-6">' +
						'<h2 class="demo-headline">' +
							'<small>Responsive</small>' +
							'Demo' +
						'</h2>' +
					'</div>' +
					'<div class="hidden-xs col-sm-6 text-right">' +
						'<span class="demo-device sitesymbol-device-phone js-demo-device js-demo-device-xs" role="presentation" aria-hidden="true">XS</span>' +
						'<span class="demo-device sitesymbol-device-fablet js-demo-device js-demo-device-sm" role="presentation" aria-hidden="true">SM</span>' +
						'<span class="demo-device sitesymbol-device-tablet js-demo-device js-demo-device-md" role="presentation" aria-hidden="true">MD</span>' +
						'<span class="demo-device sitesymbol-device-computer js-demo-device js-demo-device-lg" role="presentation" aria-hidden="true">LG</span>' +
					'</div>' +
				'</div>'
			);

			//adding popup HTML to DOM
			$('.js-demo-resizer').prepend('<div class="demo demo-header">' +
					'<div class="demo-gridly">' +
						'<div class="row">' +
							'<div class="col-xs-1"><div class="demo-gridy-block"></div></div>' +
							'<div class="col-xs-1"><div class="demo-gridy-block"></div></div>' +
							'<div class="col-xs-1"><div class="demo-gridy-block"></div></div>' +
							'<div class="col-xs-1"><div class="demo-gridy-block"></div></div>' +
							'<div class="col-xs-1"><div class="demo-gridy-block"></div></div>' +
							'<div class="col-xs-1"><div class="demo-gridy-block"></div></div>' +
							'<div class="col-xs-1"><div class="demo-gridy-block"></div></div>' +
							'<div class="col-xs-1"><div class="demo-gridy-block"></div></div>' +
							'<div class="col-xs-1"><div class="demo-gridy-block"></div></div>' +
							'<div class="col-xs-1"><div class="demo-gridy-block"></div></div>' +
							'<div class="col-xs-1"><div class="demo-gridy-block"></div></div>' +
							'<div class="col-xs-1"><div class="demo-gridy-block"></div></div>' +
						'</div>' +
					'</div>' +
					'<div class="demo-buttons-wrapper">' +
						'<div class="row">' +
							'<div class="col-sm-4 col-sm-offset-4 col-xs-12 demo-buttons-line">' +
								'<div class="demo-buttons btn-group btn-block">' +
									'<label class="btn-group-item">' +
										'<input class="btn-group-input js-demo-btn" type="radio" name="viewport" value="xs">' +
										'<span class="btn-group-text btn btn-hero">Xs</span>' +
									'</label>' +
									'<label class="btn-group-item">' +
										'<input class="btn-group-input js-demo-btn" type="radio" name="viewport" value="sm">' +
										'<span class="btn-group-text btn btn-hero">Sm</span>' +
									'</label>' +
									'<label class="btn-group-item">' +
										'<input class="btn-group-input js-demo-btn" type="radio" name="viewport" value="md">' +
										'<span class="btn-group-text btn btn-hero">Md</span>' +
									'</label>' +
									'<label class="btn-group-item">' +
										'<input class="btn-group-input js-demo-btn" type="radio" name="viewport" value="lg">' +
										'<span class="btn-group-text btn btn-hero">Lg</span>' +
									'</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>'
			);


			//iframe buttons click event
			$('.js-body').on('click', '.js-demo-btn', function() {
				App.debugging( 'iFrame: resize buttons clicked', 'interaction' );

				var $this = $(this);
				var breakpoint = $this.val();
				var $resizer = $('.js-demo-resizer');
				var _isChecked = $resizer.hasClass( 'is-' + breakpoint );

				$('.js-demo-device').removeClass('is-active');

				$resizer
					.removeClass('is-xs is-sm is-md is-lg is-free');

				if( _isChecked ) { //if the switch off resizing
					$this.prop('checked', false);

					$resizer
						.addClass('is-free');
				}
				else { //when we enable a ccertain breakpoint
					$resizer
						.addClass( 'is-' + breakpoint );

					$( '.js-demo-device-' + breakpoint ).addClass('is-active');
				}
			}).keyup('.js-iframedemo', function(e) { //listen to the excape key
				if(e.keyCode == 27) {
					App.debugging( 'iFrame: Esc buttons clicked', 'interaction' );

					$('.js-demo-resizer').removeClass('is-xs is-sm is-md is-lg').addClass('is-free');

					$('.js-iframedemo-wrapper').removeClass('is-open is-opening');
					$('.js-body').removeClass('has-demo');
					$('.iframedemo-ani').remove();
				}
			});


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