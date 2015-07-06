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

			//////////////////////////////////////////////////| SELECT-EVERYTHING BUTTON
			$('.js-blender-everything').on('click', function() {
				App.debugging( 'Blender: Select-everything button slicked', 'interaction' );

				$('.js-blender-checkbox').prop('checked', 'checked');
				$(this).addClass('is-active');
			});


			//////////////////////////////////////////////////| CHECKING DEPENDENCIES
			$('.js-blender-checkbox').on('change', function() {
				App.debugging( 'Blender: Module selected', 'interaction' );

				var $this = $(this);
				var module = $this.attr('name').replace('-enable', '');
				var $version = $('.js-blender-versions[name="' + module + '-version"] option:selected');
				var dependencies = $version.attr('data-dependencies');
				var $dependencies = $( dependencies );

				$dependencies.prop('checked', 'checked');
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
				var $module = $('.js-blender-checkbox[name="' + module[0] + '-enable"]');
				var $version = $('.js-blender-checkbox[name="' + module[0] + '-version"]');

				$module.prop('checked', 'checked'); //check checkbox
				$version.val( module[1] ); //select version

			}
		};
	};


	App.blender = module;


}(App));


// start the module
App.blender.init();