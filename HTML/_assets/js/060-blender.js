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

		$.each(dep, function(index, dep) { //handel multiple dependencies
			App.debugging( 'Blender: handleDep: selecting ' + dep, 'report' );

			var $depend = $( '.js-blender-version option.js-blender-' + dep );
			var $tick = $depend.parents('.js-module-version').find('.js-blender-tick');

			if( $depend.length > 1 ) { //select latest if no version is given
				$depend.first().prop('selected', true);
			}
			else { //otherwise select precise version
				$depend.prop('selected', true);
			}

			$tick.prop('checked', true); //make the ticks

			$depend.parent().trigger('change'); //call events
		});
	}


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function() {
		App.debugging( 'Blender: Initiating', 'report' );

		//////////////////////////////////////////////////| BLENDER PAGE LISTENERS
		if( $('.js-module-version').length ) {
			App.debugging( 'Blender: Found instance', 'report' );


			//////////////////////////////////////////////////| SELECT HAS CHANGED
			$('.js-blender-version').on('change', function() {
				App.debugging( 'Blender: Version changed', 'interaction' );

				var $this = $(this);
				var ID = $this.attr('id').replace('select-', '');
				var $tick = $( '#tick-' + ID + ':checked' );
				var $wrapper = $this.parents('.js-module-version');

				if( $tick.length < 1 ) {
					App.debugging( 'Blender: ' + ID + ' module not ticked', 'report' );
				}
				else {
					App.debugging( 'Blender: ' + ID + ' module ticked', 'report' );

					var $select = $wrapper.find('.js-blender-version');
					var moduleName = $select.attr('id').replace('select-', '');
					var $version = $select.find('option:selected');
					var version = $version.val();
					var size = $version.attr('data-size');
					var dependencies = $this.find(':checked').attr('data-dependencies');

					if( dependencies ) {
						handleDep( dependencies );
					}

					App.blender.save( moduleName, version, size );
				}

				$wrapper.find('.js-blender-newer').remove(); //remove warnings

				var warning = '<div class="popover-wrapper blender-newer js-blender-newer">' +
					'	<button type="button" class="btn btn-link popover popover-dismissible js-popover">' +
					'		<span class="icon icon-size-sm icon-alert">Out of date</span>' +
					'	</button>' +
					'	<div class="popover-popup" aria-hidden="true" tabindex="-1">' +
					'		<p class="popover-popup-body">' +
					'			A newer version of this module exists.' +
					'			<button type="button" class="btn btn-link js-selectLatest" data-id="' + ID + '">Select latest</button>' +
					'		</p>' +
					'	</div>' +
					'</div>';

				if( this.selectedIndex > 0 ) {
					$wrapper.append(warning); //add warning is not latest version
					GUI.popovers.init(); //reinitiate GUI for added elements
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
				var moduleName = $select.attr('id').replace('select-', '');
				var $version = $select.find('option:selected');
				var size = $version.attr('data-size');

				if( _isChecked ) {
					var version = $version.val();

					if( dependencies ) {
						handleDep( dependencies );
					}

					App.blender.save( moduleName, version, size );
				}
				else {
					App.blender.remove( moduleName, size );
				}

			});


			//////////////////////////////////////////////////| OPTIONS HAVE BEEN CHANGED
			$('.js-blender-option').on('change', function() {
				App.debugging( 'Blender: Blender options changed', 'interaction' );

				var $this = $(this);
				var name = 'option-' + App.PREFIX + $this.attr('name');
				var value = $this.val();

				store.set( name, value );
			});


			//////////////////////////////////////////////////| OPTIONS HAVE BEEN CHANGED
			$('.js-blender').on('submit', function(e) {
				App.debugging( 'Blender: Blender submitted', 'interaction' );

				$('.js-blender-submit').prop( 'disabled', true );
				$('.js-blender-submit .icon-download').toggle();
				$('.js-blender-submit .icon-refresh').toggle();

				setTimeout(function() {
					$('.js-blender-submit').prop( 'disabled', false ).focus();
					$('.js-blender-submit .icon-download').toggle();
					$('.js-blender-submit .icon-refresh').toggle();
				}, 2000);

			});


			//////////////////////////////////////////////////| OPTIONS HAVE BEEN CHANGED
			$('.js-blender-clear').on('click', function(e) {
				App.debugging( 'Blender: Blender claer button clicked', 'interaction' );

				store.clear();

				location.reload();
			});

			//////////////////////////////////////////////////| CHECKBOX HAS BEEN CLICKED
			$('.js-module-version').on('click', '.js-selectLatest', function() {
				App.debugging( 'Blender: Select latest button clicked', 'interaction' );

				var $this = $(this);
				var ID = $this.attr('data-id');
				var $select = $('#select-' + ID);

				$select
					.find('option:first')
					.prop('selected', true)
					.trigger('change');

				$this.parents('.js-blender-newer').remove();
			});

		}


		//////////////////////////////////////////////////| SAVING CORE
		var coreModuleString = $('.js-body').attr('data-coremodules');
		var coreSize = parseInt( $('.js-body').attr('data-coresize') );
		var coreModules = coreModuleString.split(',');
		App.blender.core = 0;

		for(var i = coreModules.length - 1; i >= 0; i--) {
			var module = coreModules[i].split(':');

			App.blender.save( module[0], module[1], coreSize );

			coreSize = 0;
			App.blender.core++;
		};


		//////////////////////////////////////////////////| RESOLVING HASH
		if( window.location.hash ) {
			App.blender.hash();
		}


		//////////////////////////////////////////////////| LOAD FROM LOCAL STORAGE
		App.blender.load();
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Parse hash
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.hash = function() {
		App.debugging( 'Blender: Parsing hash', 'report' );

		if( $('.js-blender').length ) {
			App.debugging( 'Blender: Parsing hash: found blender form', 'report' );

			var hash = window.location.hash.split('/');
			delete hash[0]; //remove empty item

			if( hash[1] !== '' ) {
				App.debugging( 'Blender: Parsing hash: clearing localStorage and overwriting with hash', 'report' );

				store.clear();
			}

			for(var i = hash.length - 1; i >= 0; i--) {
				if( hash[i] !== undefined && hash[i] !== '' ) {
					App.debugging( 'Blender: Parsing hash: parsing module "' + hash[i] + '"', 'report' );

					var module = hash[i].split(':');
					var size = $('.js-blender-version option.js-blender-' + module[0] + '[value="' + module[1] + '"]').attr('data-size');

					App.blender.save( module[0], module[1], size );
				}
			};
		}
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Save to localStorage
	//
	// @param  module   string   The ID of the module to be saved
	// @param  version  string   The version string for that module to be saved
	// @param  size     integer  The size of this version to be saved
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.save = function( moduleName, version, size ) {
		if( moduleName && version ) {
			App.debugging( 'Blender: Saving module ' + moduleName + ':' + version + '(' + size + 'kb) to LocalStorage', 'report' );

			store.set( App.PREFIX + moduleName, {
				'version': version,
				'size': parseInt( size ) }
			);

			App.blender.update();
		}
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Remove from localStorage
	//
	// @param  module   string   The ID of the module to be saved
	// @param  size     integer  The size of this version to be saved
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.remove = function( moduleName, size ) {
		if( moduleName ) {
			App.debugging( 'Blender: Removing module ' + moduleName + '(' + size + 'kb) from LocalStorage', 'report' );

			store.remove( App.PREFIX + moduleName );

			App.blender.update();
		}
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Parse localStorage
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.load = function() {
		App.debugging( 'Blender: Loading modules from LocalStorage', 'report' );

		store.forEach(function( moduleName, options ) {

			//////////////////////////////////////////////////| MODULES
			if( moduleName.substring(0, App.PREFIX.length) === App.PREFIX ) {
				App.debugging( 'Blender: Loading modules: "' + moduleName + '" version "' + options.version + '"(' + options.size + 'kb)', 'report' );

				moduleName = moduleName.substring( App.PREFIX.length );
				var $tick = $( '#tick-' + moduleName );
				var $select = $( '#' + moduleName );

				if( $tick.length ) {
					$select
						.find('option[value="' + options.version + '"]')
						.prop('selected', true)
						.trigger('change');

					$tick.prop('checked', true);
				}
			}


			//////////////////////////////////////////////////| OPTIONS
			if( moduleName.substring(0, (App.PREFIX.length + 7) ) === 'option-' + App.PREFIX ) {
				App.debugging( 'Blender: Loading modules: option for ' + moduleName + ' found', 'report' );

				moduleName = moduleName.substring( (App.PREFIX.length + 7) );

				$('.js-blender-option[name="' + moduleName + '"]').prop( 'checked', true );
			}
		});

		App.blender.update();
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Update blender cart count
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.update = function() {
		App.debugging( 'Blender: Updating blender cart count', 'report' );

		var count = 0;
		var size = 0;
		var core = App.blender.core;

		store.forEach(function( moduleName, options ) { //iterate over localStorage and see what we got
			if( moduleName.substring(0, App.PREFIX.length) === App.PREFIX ) {
				size += parseInt( options.size );
				count++;
			}
		});

		if( count <= core ) {
			$('.js-body').addClass('has-onlyCore');
		}
		else {
			$('.js-body').removeClass('has-onlyCore');
		}

		$('.js-blender-count').text( ( count - core ) );
		$('.js-blender-size').text( size );

		$('.js-blender-count, .js-blender-size')
			.removeClass('isBouncing')
			.addClass('isBouncing')
			.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				$(this).removeClass('isBouncing');
			});

	};


	App.blender = module;


}(App));


// start the module
App.blender.init();