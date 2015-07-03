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
			jquery = Fs.readFileSync( App.GUIPATH + '_base/' + POST['_base-version'] + '/js/010-jquery.js', 'utf8');

			if( _includeOriginal ) {
				App.zip.addFile( jquery, '/GUI-flavour/source/js/010-jquery.js' );
			}
		}


		//////////////////////////////////////////////////| BASE
		if( App.selectedModules.js ) {
			files.push( App.GUIPATH + '_base/' + POST['_base-version'] + '/js/020-base.js' ); //include base js

			if( _includeOriginal ) {
				file = Fs.readFileSync( App.GUIPATH + '_base/' + POST['_base-version'] + '/js/020-base.js', 'utf8');
				file = App.branding.replace(file, ['[Module-Version]', ' Base v' + POST['_base-version'] + ' ']); //name the current version
				App.zip.addFile( file, '/GUI-flavour/source/js/020-base.js' );
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
					App.zip.addFile( file, '/GUI-flavour/source/js/' + module.ID + '.js' );
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
		App.zip.addFile( source, '/GUI-flavour/assets/js/gui.min.js' ); //add minified file to zip

	};


	App.js = module;


}(App));