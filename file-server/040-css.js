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
		var _includeOriginal  = App.selectedModules.includeLess; //POST.hasOwnProperty('includeless');


		//////////////////////////////////////////////////| BASE
		var lessContent = App.branding.replace(
			Fs.readFileSync(App.GUIPATH + '_base/' + POST['module-_base'] + '/less/base-mixins.less', 'utf8'),
			['[Module-Version-Brand]', ' _base v' + POST['module-_base'] + ' ' + POST['brand']]
		);

		lessContent += "\n" + App.branding.replace(
			Fs.readFileSync( App.GUIPATH + '_base/' + POST['module-_base'] + '/less/settings.less', 'utf8'),
			['[Brand]', POST['brand']]
		);

		if( _includeOriginal ) {
			App.zip.addFile( lessContent, '/source/less/_base.less' );
		}

		lessContents += lessContent;


		//////////////////////////////////////////////////| MODULES
		App.selectedModules.modules.forEach(function( module ) {
			lessContent = App.branding.replace(
				Fs.readFileSync( App.GUIPATH + module.ID + '/' + module.version + '/less/module-mixins.less', 'utf8'),
				['[Module-Version-Brand]', ' ' + module.name + ' v' + module.version + ' ' + POST['brand'] + ' ']
			);

			lessContent += "\n" + App.branding.replace(
				Fs.readFileSync( App.GUIPATH + module.ID + '/' + module.version + '/less/settings.less', 'utf8'),
				['[Brand]', POST['brand']]
			);

			if( _includeOriginal && module.less ) {
				App.zip.addFile( lessContent, '/source/less/' + module.ID + '.less' );
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
			App.zip.addFile( source, '/assets/css/gui.min.css' );

		});

	};


	App.css = module;


}(App));