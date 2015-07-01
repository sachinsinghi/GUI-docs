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
		App.debugging( 'CSS: generating css', 'report' );

		//some js stuff
		var files = [
			App.GUIPATH + '_base/1.0.0/less/base-mixins.less',
			App.GUIPATH + '_base/1.0.0/less/settings.less',
		];

		var combinedStream = CombinedStream.create();
		var lessContent = '';

		files.forEach(function(file) {
			App.debugging( 'CSS: get less content', 'send' );

			combinedStream.append(Fs.createReadStream( file ));
		});


		//collect all less
		var compileLess = Through({ objectMode: true }, function(chunk, enc, callback) {
			App.debugging( 'CSS: got less content', 'receive' );

			lessContent += chunk.toString();

			this.push( lessContent );
			callback();
		});

		combinedStream.pipe(compileLess);

		combinedStream.on('end', function() {
			App.debugging( 'CSS: compiling less', 'report' );

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


	App.css = module;


}(App));