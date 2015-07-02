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