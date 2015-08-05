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
	// private function: Handle dependencies
	//
	// @param  dependencies  string  Dependency string comma separated
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	function handleDep( dependencies ) {
		App.debugging( 'Blender: Running handleDep with ' + dependencies, 'report' );

		var dependencies = dependencies || '';
		var dep = dependencies.split(', ');

		$.each(dep, function(index, dep) {
			App.debugging( 'Blender: handleDep: selecting ' + dep, 'report' );

			var $depend = $( '.js-blender-version option.js-blender-' + dep );
			var $tick = $depend.parents('.js-module-version').find('.js-blender-tick');

			if( $depend.length > 1 ) { //select latest if no version is given
				$depend.first().prop('selected', true);
			}
			else { //otherwise select precise version
				$depend.prop('selected', true);
			}

			$tick.prop('checked', true);

			$depend.parent().trigger('change');
		});
	}


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function() {
		App.debugging( 'Blender: Initiating', 'report' );

		App.blender.load();


		if( $('.js-blender').length ) {
			App.debugging( 'Blender: Found instance', 'report' );

			//////////////////////////////////////////////////| SELECT HAS CHANGED
			$('.js-blender-version').on('change', function() {
				App.debugging( 'Blender: Version changed', 'interaction' );

				var $this = $(this);
				var ID = $this.attr('id');
				var $tick = $( '#tick-' + ID + ':checked' );
				var $wrapper = $this.parents('.js-module-version');

				if( $tick.length < 1 ) {
					App.debugging( 'Blender: ' + ID + ' module not ticked', 'report' );
				}
				else {
					App.debugging( 'Blender: ' + ID + ' module ticked', 'report' );

					var $select = $wrapper.find('.js-blender-version');
					var moduleName = $select.attr('id');
					var version = $select.find('option:selected').val();
					var dependencies = $this.find(':checked').attr('data-dependencies');

					if( dependencies ) {
						handleDep( dependencies );
					}

					App.blender.save( moduleName, version );
				}

				$wrapper.find('.js-blender-newer').remove(); //remove warnings

				if( this.selectedIndex > 0 ) {
					$wrapper.append('<small class="js-blender-newer blender-newer">There is a newer version.</small>'); //add warning is not latest version
				}
			});


			//////////////////////////////////////////////////| CHECKBOX HAS BEEN CLICKED
			$('.js-blender-tick').on('change', function() {
				App.debugging( 'Blender: Module checkbox clicked', 'interaction' );

				var $this = $(this);
				var _isChecked = $this.is(':checked');
				var $wrapper = $this.parents('.js-module-version');
				var $select = $wrapper.find('.js-blender-version');
				var dependencies = $select.find(':checked').attr('data-dependencies');
				var moduleName = $select.attr('id');

				if( _isChecked ) {
					var version = $select.find('option:selected').val();

					if( dependencies ) {
						handleDep( dependencies );
					}

					App.blender.save( moduleName, version );
				}
				else {
					App.blender.remove( moduleName );
				}

			});


			//////////////////////////////////////////////////| RESOLVING HASH
			if( window.location.hash ) {
				App.blender.hash();
			}
		}
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Parse hash
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.hash = function() {
		App.debugging( 'Blender: Parsing hash', 'report' );

		var hash = window.location.hash.split('/');
		delete hash[0]; //remove empty item

		for(var i = hash.length - 1; i >= 0; i--) {
			if( hash[i] !== undefined ) {

				var module = hash[i].split(':');
				var $version = $('.js-blender-version[name="module-' + module[0] + '"]');

				$version
					.val( module[1] ) //select version
					.trigger('change'); //executing event handler
			}
		};
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Save to localStorage
	//
	// @param  module   string  The ID of the module to be saved
	// @param  version  string  The version string for that module to be saved
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.save = function( moduleName, version ) {
		App.debugging( 'Blender: Saving module ' + moduleName + ':' + version + ' to LocalStorage', 'report' );

		store.set(moduleName, version);
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Remove from localStorage
	//
	// @param  module   string  The ID of the module to be saved
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.remove = function( moduleName ) {
		App.debugging( 'Blender: Removing module ' + moduleName + ' from LocalStorage', 'report' );

		store.remove(moduleName);
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Parse localStorage
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.load = function() {
		App.debugging( 'Blender: Loading modules from LocalStorage', 'report' );

		store.forEach(function( moduleName, version ) {
			App.debugging( 'Blender: Loading modules: found module "' + moduleName + '" in "' + version + '"', 'report' );

			var $tick = $( '#tick-' + moduleName );
			var $select = $( '#' + moduleName );

			if( $tick.length ) {
				$select.find('option[value="' + version + '"]').prop('selected', true);
				$tick.prop('checked', true);
			}
		})
	};


	App.blender = module;


}(App));


// start the module
App.blender.init();