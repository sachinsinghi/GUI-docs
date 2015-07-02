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

		App.files.getPost();

		App.zip.queuing('css', true);
		App.zip.queuing('js', true);
		App.zip.queuing('html', true);
		// App.zip.queuing('assets', true);

		App.css.get();
		App.js.get();
		App.html.get();
		// App.assets.get();
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Saves an array of the selected modules globally
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.getPost = function() {
		App.debugging( 'Files: Parsing POST', 'report' );

		var POST = App.POST;
		var fromPOST = [];


		Object.keys( POST ).forEach(function( moduleName ) {
			if( moduleName.indexOf('-enable', moduleName.length - 7) !== -1 ) { //only look at enabled checkboxes

				var module = moduleName.substr(0, moduleName.length - 7);
				var version = POST[module + '-version'];
				var json = App.modules.getJson( module );
				var newObject = _.extend(json, json.versions[version]); //merge version to the same level
				newObject.version = version;

				fromPOST.push( newObject );
			}
		});

		App.selectedModules = fromPOST; //save globally
	};


	App.files = module;


}(App));