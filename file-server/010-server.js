/*! [Name-Version] */
/***************************************************************************************************************************************************************
 *
 * Westpac GUI file server
 *
 **************************************************************************************************************************************************************/

'use strict';



//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
var Fs = require('fs');
var Http = require('http');
var Chalk = require('chalk');
var CFonts = require('cfonts');
var Express = require('express');
var BodyParser = require('body-parser');


var App = (function() {

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// settings
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	return {
		DEBUG: true, //debugging infos
		BLENDERURL: 'http://gel.westpacgroup.com.au/blender/', //server url to blender


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Initiate app
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		init: function() {
			if( App.DEBUG ) App.debugging( ' DEBUGGING| INFORMATION', 'headline' );

			var app = Express();

			//starting server
			app
				.use( BodyParser.urlencoded({ extended: false }) )

				.listen(1337, function(){
					App.debugging( 'Server started on port 1337', 'report' );
				});


			//listening to post request
			app.post('/blender', function(request, response) {
				App.debugging( 'Received new request', 'interaction' );

				var q = request.body.q;

				App.files.init( response, request.body );


			});

		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// debugging prettiness
		//
		// text  [string]   Text to be printed to debugger
		// code  [string]   The urgency as a string: ['report', 'error', 'interaction', 'send', 'receive']
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		debugging: function( text, code ) {

			if( code === 'headline' ) {
				if( App.DEBUG ) {
					var fonts = new CFonts({
						'text': text,
						'colors': ['white', 'gray'],
						'maxLength': 12,
					});
				}
			}

			if( code === 'report' ) {
				if( App.DEBUG ) console.log(Chalk.bgWhite("\n" + Chalk.bold.green(' \u2611  ') + Chalk.black(text + ' ')));
			}

			else if( code === 'error' ) {
				if( App.DEBUG ) console.log(Chalk.bgWhite("\n" + Chalk.red(' \u2612  ') + Chalk.black(text + ' ')));
			}

			else if( code === 'interaction' ) {
				if( App.DEBUG ) console.log(Chalk.bgWhite("\n" + Chalk.blue(' \u261C  ') + Chalk.black(text + ' ')));
			}

			else if( code === 'send' ) {
				if( App.DEBUG ) console.log(Chalk.bgWhite("\n" + Chalk.bold.cyan(' \u219D  ') + Chalk.black(text + ' ')));
			}

			else if( code === 'receive' ) {
				if( App.DEBUG ) console.log(Chalk.bgWhite("\n" + Chalk.bold.cyan(' \u219C  ') + Chalk.black(text + ' ')));
			}

		}

	}

}());


//run app
App.init();