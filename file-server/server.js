/*! GUI-docs - v0.0.1 */
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
/***************************************************************************************************************************************************************
 *
 * Files
 *
 * Get all files, concatenate them, compile them if necessary and serve them as zip.
 *
 **************************************************************************************************************************************************************/


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
var CombinedStream = require('combined-stream2');
var Archiver = require('archiver');
var UglifyJS = require('uglify-js');
var Through = require('through2');
var Wait = require('wait.for');
var Less = require('less');


(function(App) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function( response, POST ) {
		App.debugging( 'File server: new query', 'report' );

		App.files.getCSS( response, POST );
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// get the download zip file
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.getZip = function( response, POST, cssContent ) {
		App.debugging( 'File server: compiling zip', 'report' );

		var zip = Archiver('zip');

		var flavourURL = App.files.getFlavourURL( POST );
		var jsContent = '/* GUI flavor ' + flavourURL + ' */' + "\n" + App.files.getJS( POST );
		var cssContent = '/* GUI flavor ' + flavourURL + ' */' + "\n" + cssContent.css;

		response.writeHead(200, {
			'Content-Type': 'application/zip',
			'Content-disposition': 'attachment; filename=GUI-flavour.zip',
		});

		zip.pipe(response);

		zip
			.append(jsContent, { name: 'GUI/assets/js/site.js' })
			.append(cssContent, { name: 'GUI/assets/css/site.css' });

		//some js magic (all mixins in one file, all setting sin one?)
		zip.file('./../GUI-source/base/1.0.0/less/base-mixins.less', { name: 'GUI/assets/less/base-mixins.less' })

		zip.finalize(); //send to server

	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// get all js files and concat them
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.getJS = function( POST ) {
		App.debugging( 'File server: uglifying js files', 'report' );

		//some js stuff
		var files = [
			'./../GUI-source/base/1.0.0/js/010-jquery-1.11.2.min.js',
			'./../GUI-source/base/1.0.0/js/020-base.js',
		];

		var result = UglifyJS.minify( files );

		return result.code;

	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// get all less files and compile them
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.getCSS = function( response, POST ) {
		App.debugging( 'File server: generating css', 'report' );

		//some js stuff
		var files = [
			'./../GUI-source/base/1.0.0/less/base-mixins.less',
			'./../GUI-source/base/1.0.0/less/settings.less',
		];

		var combinedStream = CombinedStream.create();
		var lessContent = '';

		files.forEach(function(file) {
			App.debugging( 'File server: get less content', 'send' );

			combinedStream.append(Fs.createReadStream( file ));
		});


		//collect all less
		var compileLess = Through({ objectMode: true }, function(chunk, enc, callback) {
			App.debugging( 'File server: got less content', 'receive' );

			lessContent += chunk.toString();

			this.push( lessContent );
			callback();
		});

		combinedStream.pipe(compileLess);

		combinedStream.on('end', function() {
			App.debugging( 'File server: compiling less', 'report' );

			//replace the brand placeholder
			lessContent = lessContent.replace(/\[Brand\]/g, 'BOM');

			//compile less
			Less
				.render(lessContent, {
					compress: true
				},
				function(e, output) {

					App.files.getZip( response, POST, output );

				});

		});

	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// get the flavour url
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.getFlavourURL = function( POST ) {
		App.debugging( 'File server: generating flavour link', 'report' );

		var url = App.BLENDERURL + '#';

		//some js stuff
		url += '-module:1.0.0-module2:1.0.1-module3:2.0.0';

		return url;

	};


	App.files = module;


}(App));