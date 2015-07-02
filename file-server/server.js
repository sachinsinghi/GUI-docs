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
		DEBUG: true, //debugging infos
		BLENDERURL: 'http://gel.westpacgroup.com.au/blender/', //server url to blender
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

				.listen(1337, function(){
					App.debugging( 'Server started on port 1337', 'report' );
				});


			//listening to post request
			app.post('/blender', function(request, response) {
				App.debugging( 'Received new request', 'interaction' );

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
/***************************************************************************************************************************************************************
 *
 * Files
 *
 * Route to all files for concatenating, compiling and if necessary branding.
 *
 **************************************************************************************************************************************************************/


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
var UglifyJS = require('uglify-js');
var Less = require('less');


(function(App) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function() {
		App.debugging( 'Files: new query', 'report' );

		//////////////////////////////////////////////////| PARSING POST
		App.files.getPost();

		//////////////////////////////////////////////////| QUEUING FILES
		App.zip.queuing('css', true);
		App.zip.queuing('html', true);

		if( App.selectedModules.js ) {
			App.zip.queuing('js', true);
		}
		App.zip.queuing('assets', true);


		//////////////////////////////////////////////////| GENERATING FILES
		App.css.get();

		if( App.selectedModules.js ) {
			App.js.get();
		}

		App.html.get();
		App.assets.get();
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Saves an array of the selected modules globally
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.getPost = function() {
		App.debugging( 'Files: Parsing POST', 'report' );

		var POST = App.POST;
		var fromPOST = {};
		fromPOST.modules = [];
		var _hasJS = false;
		var _hasSVG = false;
		var _includeJquery = POST.hasOwnProperty('jquery');


		//////////////////////////////////////////////////| ADDING MODULES
		Object.keys( POST ).forEach(function( moduleName ) {
			if( moduleName.indexOf('-enable', moduleName.length - 7) !== -1 ) { //only look at enabled checkboxes

				var module = moduleName.substr(0, moduleName.length - 7);
				var version = POST[module + '-version'];
				var json = App.modules.getJson( module );
				var newObject = _.extend(json, json.versions[version]); //merge version to the same level
				newObject.version = version;

				if( newObject.js && module.ID !== '_base' || !_includeJquery ) {
					_hasJS = true;
				}

				if( newObject.svg ) {
					_hasSVG = true;
				}

				fromPOST.modules.push( newObject );
			}
		});


		//////////////////////////////////////////////////| ADDING BASE
		var json = App.modules.getJson( '_base' );
		var newObject = _.extend(json, json.versions[ POST['_base-version'] ]); //merge version to the same level
		newObject.version = POST['_base-version'];

		fromPOST.base = newObject;


		//////////////////////////////////////////////////| ADDING OPTIONS
		if( _includeJquery ) { //include jquery even if no other js is needed... controversial!
			_hasJS = true;
		}

		fromPOST.js = _hasJS;
		fromPOST.svg = _hasSVG;


		App.selectedModules = fromPOST; //save globally
	};


	App.files = module;


}(App));
/***************************************************************************************************************************************************************
 *
 * Compile JS files
 *
 **************************************************************************************************************************************************************/


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


(function(App) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function() {
		App.debugging( 'JS: Initiating', 'report' );
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Get all js files and concat them
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.get = function() {
		App.debugging( 'JS: Generating js', 'report' );

		var files = [];
		var file = '';
		var POST = App.POST;
		var jquery = '';
		var _includeJquery = POST.hasOwnProperty('jquery');
		var _includeOriginal  = POST.hasOwnProperty('jsunminified');


		//////////////////////////////////////////////////| JQUERY
		if( _includeJquery ) { //optional include jquery
			jquery = Fs.readFileSync( App.GUIPATH + '_base/' + POST['_base-version'] + '/js/010-jquery-1.11.2.min.js', 'utf8');

			if( _includeOriginal ) {
				App.zip.addFiles( jquery, '/GUI-flavour/source/js/010-jquery-1.11.2.min.js' );
			}
		}


		//////////////////////////////////////////////////| BASE
		if( App.selectedModules.js ) {
			files.push( App.GUIPATH + '_base/' + POST['_base-version'] + '/js/020-base.js' ); //include base js

			if( _includeOriginal ) {
				file = Fs.readFileSync( App.GUIPATH + '_base/' + POST['_base-version'] + '/js/020-base.js', 'utf8');
				file = App.branding.replace(file, ['[Module-Version]', ' Base v' + POST['_base-version'] + ' ']); //name the current version
				App.zip.addFiles( file, '/GUI-flavour/source/js/020-base.js' );
			}
		}


		//////////////////////////////////////////////////| MODULES
		App.selectedModules.modules.forEach(function(module) {
			var _hasJS = module.js; //look if this module has js

			if( _hasJS ) {
				files.push( App.GUIPATH + module.ID + '/' + module.version + '/js/' + module.ID + '.js' ); //add js to uglify

				file = Fs.readFileSync( App.GUIPATH + module.ID + '/' + module.version + '/js/' + module.ID + '.js', 'utf8');

				if( _includeOriginal ) {
					file = App.branding.replace(file, ['[Module-Version]', ' ' + module.name + ' v' + module.version + ' ']); //name the current version
					App.zip.addFiles( file, '/GUI-flavour/source/js/' + module.ID + '.js' );
				}
			}
		});


		//uglify js
		if( files.length > 0 ) {
			var result = UglifyJS.minify( files );
		}
		else {
			result = {};
			result.code = '';
		}

		var source = App.banner.attach( jquery + result.code ); //attach a banner to the top of the file with a URL of this build

		App.zip.queuing('js', false); //js queue is done
		App.zip.addFiles( source, '/GUI-flavour/assets/js/gui.min.js' ); //add minified file to zip

	};


	App.js = module;


}(App));
/***************************************************************************************************************************************************************
 *
 * Compile CSS files
 *
 **************************************************************************************************************************************************************/


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


(function(App) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function() {
		App.debugging( 'CSS: Initiating', 'report' );
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Get all less files and compile them
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.get = function() {
		App.debugging( 'CSS: Generating css', 'report' );

		var POST = App.POST;
		var lessContents = '';
		var _includeOriginal  = POST.hasOwnProperty('includeless');


		//////////////////////////////////////////////////| BASE
		var lessContent = App.branding.replace(
			Fs.readFileSync(App.GUIPATH + '_base/' + POST['_base-version'] + '/less/base-mixins.less', 'utf8'),
			['[Module-Version-Brand]', ' _base v' + POST['_base-version'] + ' ' + POST['brand']]
		);

		lessContent += "\n" + App.branding.replace(
			Fs.readFileSync( App.GUIPATH + '_base/' + POST['_base-version'] + '/less/settings.less', 'utf8'),
			['[Brand]', POST['brand']]
		);

		if( _includeOriginal ) {
			App.zip.addFiles( lessContent, '/GUI-flavour/source/less/_base.less' );
		}

		lessContents += lessContent;


		//////////////////////////////////////////////////| MODULES
		App.selectedModules.modules.forEach(function(module) {
			lessContent = App.branding.replace(
				Fs.readFileSync( App.GUIPATH + module.ID + '/' + module.version + '/less/module-mixins.less', 'utf8'),
				['[Module-Version-Brand]', ' ' + module.name + ' v' + module.version + ' ' + POST['brand'] + ' ']
			);

			lessContent += "\n" + App.branding.replace(
				Fs.readFileSync( App.GUIPATH + module.ID + '/' + module.version + '/less/settings.less', 'utf8'),
				['[Brand]', POST['brand']]
			);

			if( _includeOriginal ) {
				App.zip.addFiles( lessContent, '/GUI-flavour/source/less/' + module.ID + '.less' );
			}

			lessContents += lessContent;
		});


		//compile less
		Less.render(lessContents, {
			compress: true
		},
		function(e, output) {

			var source = App.banner.attach( output.css ); //attach a banner to the top of the file with a URL of this build

			App.zip.queuing('css', false); //css queue is done
			App.zip.addFiles( source, '/GUI-flavour/assets/css/gui.min.css' );

		});

	};


	App.css = module;


}(App));
/***************************************************************************************************************************************************************
 *
 * Compile HTML files
 *
 **************************************************************************************************************************************************************/


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


(function(App) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function() {
		App.debugging( 'HTML: Initiating', 'report' );
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Get all html files
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.get = function() {
		App.debugging( 'HTML: Getting all HTML files', 'report' );

		var index = Fs.readFileSync( App.TEMPPATH + 'index.html', 'utf8');

		index = _.template( index )({
			_hasJS: App.selectedModules.js,
			_hasSVG: App.selectedModules.svg,
		});

		//some logic to remove or add: grunticon code and reference, js

		App.zip.queuing('html', false); //html queue is done
		App.zip.addFiles( index, '/GUI-flavour/index.html' );

	};


	App.html = module;


}(App));
/***************************************************************************************************************************************************************
 *
 * Compile symbole files
 *
 **************************************************************************************************************************************************************/


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


(function(App) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function() {
		App.debugging( 'Assets: Initiating', 'report' );
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Get all assets files
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.get = function() {
		App.debugging( 'Assets: Getting all files', 'report' );

	};


	App.assets = module;


}(App));
/***************************************************************************************************************************************************************
 *
 * Brand all content
 *
 **************************************************************************************************************************************************************/


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


(function(App) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function() {
		App.debugging( 'Branding: Initiating', 'report' );
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Returns content with elements replaced
	//
	// @param   content  [string]  Content that needs parsing
	// @param   replace  [array]   First element is replaced with second
	//
	// @return  [string]  Finished parsed content
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.replace = function( content, replace ) {
		App.debugging( 'Branding: Replacing "' + replace[0] + '" with "' + replace[1] + '"', 'report' );

		return content.replace(replace[0], replace[1]);

	};


	App.branding = module;


}(App));
/***************************************************************************************************************************************************************
 *
 * Get modules infos
 *
 **************************************************************************************************************************************************************/


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


(function(App) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function() {
		App.debugging( 'Modules: Initiating', 'report' );
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Returns json object of a specific module.json
	//
	// @param   module  [sting]  ID of module
	//
	// @return  [object]  Json object of module.json
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.getJson = function( module ) {
		App.debugging( 'Modules: Getting JSON for ' + module, 'report' );


		if( App.GUImodules === undefined ) { //flatten GUI json and assign to global

			App.GUImodules = {};
			Object.keys( App.GUI.modules ).forEach(function( category ) {

				Object.keys( App.GUI.modules[ category ] ).forEach(function( mod ) {
					App.GUImodules[ mod ] = App.GUI.modules[ category ][ mod ];
				});

			});
		}

		return App.GUImodules[module];
		// JSON.parse( Fs.readFileSync( App.GUIPATH + module + '/module.json', 'utf8') ); //getting from module.json if we want to have a lot of I/O (we don't)

	};


	App.modules = module;


}(App));
/***************************************************************************************************************************************************************
 *
 * Get banner infos
 *
 **************************************************************************************************************************************************************/


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


(function(App) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function() {
		App.debugging( 'Banner: Initiating', 'report' );
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Get the banner text
	//
	// @return  [string]  Content with attached banner
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.get = function() {
		App.debugging( 'Banner: Generating banner', 'report' );

		return '/* GUI flavour ' + App.banner.getFlavourURL() + ' */' + "\n";

	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Attach the banner to some content
	//
	// @param   content  [string]  Content the banner needs to be attached to
	//
	// @return  [string]  Content with attached banner
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.attach = function( content ) {
		App.debugging( 'Banner: Attaching banner', 'report' );

		if( content.length > 0 ) {
			return App.banner.get() + content;
		}
		else {
			return '';
		}

	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Get the flavour url
	//
	// @return  [string]  The URL string to this build
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.getFlavourURL = function() {
		App.debugging( 'Banner: Generating flavour link', 'report' );

		var url = App.BLENDERURL + '#';

		url += '/' + App.selectedModules.base.ID + ':' + App.selectedModules.base.version; //adding base

		App.selectedModules.modules.forEach(function(module) { //adding modules
			url += '/' + module.ID + ':' + module.version;
		});

		return url;
	};


	App.banner = module;


}(App));
/***************************************************************************************************************************************************************
 *
 * Collect and zip all files
 *
 **************************************************************************************************************************************************************/


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
var Archiver = require('archiver');


(function(App) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function() {
		App.debugging( 'Zip: Initiating', 'report' );
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Zip all files up and send to response
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.getZip = function() {
		App.debugging( 'Zip: Compiling zip', 'report' );

		App.response.writeHead(200, {
			'Content-Type': 'application/zip',
			'Content-disposition': 'attachment; filename=GUI-flavour.zip',
		});

		App.zip.archive.pipe( App.response );

		App.zip.archive.finalize(); //send to server

		//clearning up
		App.zip.archive = Archiver('zip'); //new archive
		App.zip.files = []; //empty files
		module.queue = {}; // empty queue

	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Add a file to the zip archive
	//
	// @param   content      [string]  The content of the file
	// @param   archivePath  [string]  The path this file will have inside the archive
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.addFiles = function( content, archivePath ) {
		App.debugging( 'Zip: Adding file: ' + archivePath, 'report' );

		if(typeof content !== 'string') {
			App.debugging( 'Zip: Adding file: Zipfile can only be string, is ' + (typeof content), 'error' );
		}
		else {
			App.zip.files.push({ //collecting all files
				content: content,
				name: archivePath,
			});
		}


		if( App.zip.isQueuingEmpty() ) { //if this is the last file, add them all to the archive

			App.zip.files.forEach(function( file ) {
				App.zip.archive.append( file.content, { name: file.name } );
			});

			App.zip.getZip(); //finalize the zip
		}

	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Add or remove a type to queue so we can wait for all to be finished
	//
	// @param   type           [string]   Identifier for a type of file we are waiting for
	// @param   _isBeingAdded  [boolean]  Whether or not this type is added or removed from the queue
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.queuing = function( type, _isBeingAdded ) {
		App.debugging( 'Zip: Queuing files', 'report' );

		if( _isBeingAdded ) {
			App.debugging( 'Zip: Queue: Adding ' + type, 'report' );

			App.zip.queue[type] = true;
		}
		else {
			if( App.zip.queue[type] ) {
				App.debugging( 'Zip: Queue: Removing ' + type, 'report' );

				delete App.zip.queue[type];
			}
		}

	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Check if the queue is empty
	//
	// @return  [boolean]  Whether or not it is...
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.isQueuingEmpty = function() {
		App.debugging( 'Zip: Checking queue', 'report' );

		for( var prop in App.zip.queue ) {
			if( App.zip.queue.hasOwnProperty(prop) ) {
				App.debugging( 'Zip: Queue: Still things in the queue', 'report' );

				return false;
			}
		}

		App.debugging( 'Zip: Queue: Queue is empty', 'report' );
		return true;
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Global vars
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.queue = {}; //global object to hold queue
	module.archive = Archiver('zip'); //class to add files to zip globally
	module.files = []; //an array of all files to be added to the archive


	App.zip = module;


}(App));