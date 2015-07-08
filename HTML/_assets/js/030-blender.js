/***************************************************************************************************************************************************************
 *
 * Blender functionality
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
		App.debugging( 'Blender: Initiating', 'report' );

		if( $('.js-blender').length ) {
			App.debugging( 'Blender: Found instance', 'report' );

			//////////////////////////////////////////////////| CHECKING DEPENDENCIES
			$('.js-blender-module').on('change', function() {
				App.debugging( 'Blender: Module selected', 'interaction' );

				var $this = $(this);
				var dependencies = $this.find(':checked').attr('data-dependencies');
				var $depend = $( '.js-blender-module option' + dependencies );

				if( $depend.length > 1 ) { //select latest if no version is given
					$depend.first().prop('selected', true);
				}
				else { //otherwise select precise version
					$depend.prop('selected', true);
				}
				$depend.trigger('change');


				$this.siblings('.js-blender-newer').remove(); //remove warnings

				if( this.selectedIndex > 1 ) {
					$this.after('<small class="js-blender-newer blender-newer">There is a newer version.</small>'); //add warning is not latest version
				}
			});


			//////////////////////////////////////////////////| RESOLVING HASH
			if( window.location.hash ) {
				App.blender.hash();
			}
		}
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Module to parse hash
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.hash = function() {
		App.debugging( 'Blender: Parsing hash', 'report' );

		var hash = window.location.hash.split('/');
		delete hash[0]; //remove empty item

		for(var i = hash.length - 1; i >= 0; i--) {
			if( hash[i] !== undefined ) {

				var module = hash[i].split(':');
				var $version = $('.js-blender-module[name="module-' + module[0] + '"]');

				$version
					.val( module[1] ) //select version
					.trigger('change'); //executing event handler
			}
		};
	};


	App.blender = module;


}(App));


// start the module
App.blender.init();