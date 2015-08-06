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
		var base = '';
		var POST = App.POST;
		var jquery = '';
		var _includeJquery = App.selectedModules.includeJquery; //POST.hasOwnProperty('jquery');
		var _includeOriginal  = App.selectedModules.includeUnminifiedJS; //POST.hasOwnProperty('jsunminified');


		//////////////////////////////////////////////////| JQUERY
		if( _includeJquery ) { //optional include jquery
			jquery = Fs.readFileSync( App.GUIPATH + '_base/' + POST['module-_base'] + '/js/010-jquery.js', 'utf8');

			if( _includeOriginal ) {
				App.zip.addFile( jquery, '/source/js/010-jquery.js' );
			}
		}


		//////////////////////////////////////////////////| BASE
		if( App.selectedModules.js ) {
			base = Fs.readFileSync( App.GUIPATH + '_base/' + POST['module-_base'] + '/js/020-base.js', 'utf8');
			base = App.branding.replace(base, ['[-Debug-]', 'false']); //remove debugging infos

			var base = UglifyJS.minify( base, { fromString: true });

			if( _includeOriginal ) {
				file = Fs.readFileSync( App.GUIPATH + '_base/' + POST['module-_base'] + '/js/020-base.js', 'utf8');
				file = App.branding.replace(file, ['[Module-Version]', ' Base v' + POST['module-_base'] + ' ']); //name the current version
				file = App.branding.replace(file, ['[Debug]', 'false']); //remove debugging infos
				App.zip.addFile( file, '/source/js/020-base.js' );
			}
		}


		//////////////////////////////////////////////////| MODULES
		App.selectedModules.modules.forEach(function( module ) {
			var _hasJS = module.js; //look if this module has js

			if( _hasJS ) {
				files.push( App.GUIPATH + module.ID + '/' + module.version + '/js/' + module.ID + '.js' ); //add js to uglify

				file = Fs.readFileSync( App.GUIPATH + module.ID + '/' + module.version + '/js/' + module.ID + '.js', 'utf8');

				if( _includeOriginal ) {
					file = App.branding.replace(file, ['[Module-Version]', ' ' + module.name + ' v' + module.version + ' ']); //name the current version
					App.zip.addFile( file, '/source/js/' + module.ID + '.js' );
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

		var source = App.banner.attach( jquery + base.code + result.code ); //attach a banner to the top of the file with a URL of this build

		App.zip.queuing('js', false); //js queue is done
		App.zip.addFile( source, '/assets/js/gui.min.js' ); //add minified file to zip

	};


	App.js = module;


}(App));