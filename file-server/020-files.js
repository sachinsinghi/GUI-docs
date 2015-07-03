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