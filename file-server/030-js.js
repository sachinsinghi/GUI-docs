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
		App.debugging( 'JS: uglifying js files', 'report' );

		var files = [];
		var file = '';
		var POST = App.POST;
		var _includeJquery = POST.hasOwnProperty('jquery');
		var _includeOriginal  = POST.hasOwnProperty('jsunminified');

		if( _includeJquery ) { //optional include jquery
			files.push( App.GUIPATH + '_base/' + POST['_base-version'] + '/js/010-jquery-1.11.2.min.js' );

			if( _includeOriginal ) {
				file = Fs.readFileSync( App.GUIPATH + '_base/' + POST['_base-version'] + '/js/010-jquery-1.11.2.min.js', 'utf8');
				App.zip.addFiles( file, '/GUI-flavour/source/js/010-jquery-1.11.2.min.js' );
			}
		}

		files.push( App.GUIPATH + '_base/' + POST['_base-version'] + '/js/020-base.js' ); //include base js

		if( _includeOriginal ) {
			file = Fs.readFileSync( App.GUIPATH + '_base/' + POST['_base-version'] + '/js/020-base.js', 'utf8');
			file = App.branding.replace(file, ['[Module-Version]', ' Base v' + POST['_base-version'] + ' ']); //name the current version
			App.zip.addFiles( file, '/GUI-flavour/source/js/020-base.js' );
		}


		Object.keys( POST ).forEach(function( moduleName ) {
			if( moduleName.indexOf('-enable', moduleName.length - 7) !== -1 ) { //only look at enabled checkboxes

				var module = moduleName.substr(0, moduleName.length - 7);
				var version = POST[module + '-version'];
				var json = App.modules.getJson( module );
				var _hasJS = json.versions[version].js; //look into module.json and see if this module has js

				if( _hasJS ) {
					files.push( App.GUIPATH + module + '/' + version + '/js/' + module + '.js' ); //add js to uglify

					file = Fs.readFileSync( App.GUIPATH + module + '/' + version + '/js/' + module + '.js', 'utf8');

					if( _includeOriginal ) {
						file = App.branding.replace(file, ['[Module-Version]', ' ' + json.name + ' v' + version + ' ']); //name the current version
						App.zip.addFiles( file, '/GUI-flavour/source/js/' + module + '.js' );
					}
				}
			}
		});

		var result = UglifyJS.minify( files );
		var source = App.banner.get( result.code ); //attach a banner to the top of the file with a URL of this build

		App.zip.queuing('js', false); //js queue is done
		App.zip.addFiles( source, '/GUI-flavour/assets/js/site.min.js' ); //add minified file to zip

	};


	App.js = module;


}(App));