/*![Module-Version]*/
/***************************************************************************************************************************************************************
 *
 * Westpac GUI pages
 *
 * This base includes a debugging console.
 *
 **************************************************************************************************************************************************************/

'use strict';


var App = (function Init() {

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// settings
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	return {
		DEBUG: [Debug], //debugging infos
		DEBUGfilter: ['Pokemon'], //filter debug messages
		PREFIX: 'BLEND',
		LOG: 'https://gel.westpacgroup.com.au/GUI/blender/remote/blender.log',


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Initiate App
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		init: function AppInit() {
			if( !window.console ) { //removing console.log from IE8
				console = {
					log: function() {}
				};
			}

			if( App.DEBUG ) console.log('%cDEBUGGING INFORMATION', 'font-size: 25px;');

			//remove fallback HTML class
			$('html')
				.removeClass('no-js')
				.addClass('js');

		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// debugging prettiness
		//
		// @param   text  [string]  Text to be printed to debugger
		// @param   code  [string]  The urgency as a string: ['report', 'error', 'interaction', 'send', 'receive']
		//
		// @return  [none]
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		debugging: function Debug( text, code ) {

			if( App.DEBUGfilter.length > 0 ) {
				var identifier = text.split(': ');
				var output = '';

				for(var i = App.DEBUGfilter.length - 1; i >= 0; i--) {
					if( identifier[0] === App.DEBUGfilter[i] ) {
						output = text;
					}
				};

				text = output;
			}

			if( App.DEBUG && text.length > 0 ) {
				if( code === 'report' ) {
					console.log('%c\u2611 ', 'color: green; font-size: 18px;', text);
				}

				else if( code === 'error' ) {
					console.log('%c\u2612 ', 'color: red; font-size: 18px;', text);
				}

				else if( code === 'interaction' ) {
					console.log('%c\u261C ', 'color: blue; font-size: 18px;', text);
				}

				else if( code === 'send' ) {
					console.log('%c\u219D ', 'color: pink; font-size: 18px;', text);
				}

				else if( code === 'receive' ) {
					console.log('%c\u219C ', 'color: pink; font-size: 18px;', text);
				}
			}

		}

	}

}());


//run App
App.init();