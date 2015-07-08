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
var Path = require('path');
var Chalk = require('chalk');
var _ = require("underscore");
var CFonts = require('cfonts');
var Express = require('express');
var BodyParser = require('body-parser');


var App = (function() {

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Settings
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	return {
		DEBUG: [Debug], //debugging infos
		GUIRURL: 'http://gel.westpacgroup.com.au/',
		GUIPATH: Path.normalize(__dirname + '/../GUI-source-master/'),
		TEMPPATH: Path.normalize(__dirname + '/._template/'),


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Initiate app
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		init: function() {
			if( App.DEBUG ) App.debugging( ' DEBUGGING| INFORMATION', 'headline' );

			App.GUI = JSON.parse( Fs.readFileSync( App.GUIPATH + '/GUI.json', 'utf8') );
			var app = Express();

			//starting server
			app
				.use( BodyParser.urlencoded({ extended: false }) )

				.listen(8080, function(){
					App.debugging( 'Server started on port 8080', 'report' );
				});


			app.get('/', function(request, response){
				response.send('Hello world!');
			});


			//listening to post request
			app.post('/blender', function(request, response) {
				App.debugging( 'Received new request from: ' + request.headers['x-forwarded-for'] + ' / ' + request.connection.remoteAddress, 'interaction' );

				App.response = response;
				App.POST = request.body;

				App.files.init();
			});

		},


		//------------------------------------------------------------------------------------------------------------------------------------------------------------
		// Global vars
		//------------------------------------------------------------------------------------------------------------------------------------------------------------
		response: {}, //server response object
		POST: {}, //POST values from client
		GUI: {}, //GUI.json contents


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Debugging prettiness
		//
		// @param  text  [string]   Text to be printed to debugger
		// @param  code  [string]   The urgency as a string: ['report', 'error', 'interaction', 'send', 'receive']
		//
		// @return  [output]  console.log output
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