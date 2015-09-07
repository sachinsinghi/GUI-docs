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
		PREFIX: 'BLEND',


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

			if( code === 'report' ) {
				if( App.DEBUG ) console.log('%c\u2611 ', 'color: green; font-size: 18px;', text);
			}

			else if( code === 'error' ) {
				if( App.DEBUG ) console.log('%c\u2612 ', 'color: red; font-size: 18px;', text);
			}

			else if( code === 'interaction' ) {
				if( App.DEBUG ) console.log('%c\u261C ', 'color: blue; font-size: 18px;', text);
			}

			else if( code === 'send' ) {
				if( App.DEBUG ) console.log('%c\u219D ', 'color: pink; font-size: 18px;', text);
			}

			else if( code === 'receive' ) {
				if( App.DEBUG ) console.log('%c\u219C ', 'color: pink; font-size: 18px;', text);
			}

		}

	}

}());


//run GUI
App.init();