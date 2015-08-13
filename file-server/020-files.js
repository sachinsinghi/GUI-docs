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

		//////////////////////////////////////////////////| SETTING QUE
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
	// Saves an array of the selected modules globally so we don't work with the raw data that comes from the client... as that could be a mess ;)
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.getPost = function() {
		App.debugging( 'Files: Parsing POST', 'report' );

		var POST = App.POST;
		var fromPOST = {};
		fromPOST.modules = [];
		var _hasJS = false;
		var _hasSVG = false;
		var _includeJquery = POST.includeJquery === 'yes';
		var _includeUnminifiedJS = POST.includeUnminifiedJS === 'yes';
		var _includeLess = POST.includeLess === 'yes';


		//////////////////////////////////////////////////| ADDING MODULES
		Object.keys( POST ).forEach(function( moduleName ) {
			var module = moduleName.substr(5);

			if(
				moduleName.substr(0, 5) === 'tick-' &&
				POST[ moduleName ] === 'on'
			) { //only look at enabled checkboxes

				var json = App.modules.getJson( module );

				var version = POST[ 'module-' + module ];
				var newObject = _.extend( json, json.versions[ version ] ); //merge version to the same level
				newObject.version = version;

				if( newObject.js ) {
					_hasJS = true;
				}

				if( newObject.svg ) {
					_hasSVG = true;
				}

				fromPOST.modules.push( newObject );
			}
		});


		//////////////////////////////////////////////////| ADDING CORE
		fromPOST.core = [];

		Object.keys( App.GUI.modules._core ).forEach(function( moduleName ) {
			var module = App.GUI.modules._core[moduleName]

			var newObject = _.extend(module, module.versions[ POST[ 'module-' + module.ID ] ]); //merge version to the same level
			newObject.version = POST[ 'module-' + module.ID ];

			fromPOST.core.push(newObject);
		});


		//////////////////////////////////////////////////| ADDING OPTIONS
		if( _includeJquery ) { //when checkbox is ticked but you don't have any modules with js then don't include jquery... controversial!
			// _hasJS = true;
		}

		fromPOST.js = _hasJS;
		fromPOST.svg = _hasSVG;
		fromPOST.brand = POST.brand;
		fromPOST.includeJquery = _includeJquery;
		fromPOST.includeUnminifiedJS = _includeUnminifiedJS;
		fromPOST.includeLess = _includeLess;


		//////////////////////////////////////////////////| SAVIG GLOBALLY
		App.selectedModules = fromPOST;
	};


	App.files = module;


}(App));