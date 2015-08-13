/***************************************************************************************************************************************************************
 *
 * Modules toggeling
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

		if( $('.js-modules').length ) {
			App.debugging( 'Modules: Found instance', 'report' );

			//////////////////////////////////////////////////| CHECKING DEPENDENCIES
			$('.js-blender-version').on('change', function() {
				App.debugging( 'Modules: Version selected', 'interaction' );

				var $this = $(this);
				var module = $this.attr('id').replace('select-', '');
				var $selected = $this.find('option:selected');
				var version = $selected.attr('data-version');
				var $version = $('.js-blender-module' + module + ' .js-blender-version' + version);
				var $modules = $('.js-blender-module' + module + ' .js-blender-versionhtml');

				if( $this.val() !== 'nil' ) {
					$modules.removeClass('is-visible');
					$version.addClass('is-visible');
				}
			});


			//////////////////////////////////////////////////| CHECKING DEPENDENCIES
			$('.js-exampletab').on('click', function(e) {
				App.debugging( 'Modules: Tab clicked', 'interaction' );

				e.preventDefault();
				var $this = $(this);
				var href = $this.attr('href').split('#');
				var $target = $( '#' + href[ (href.length - 1) ] );
				var _isOpen = $this.parent().hasClass('is-active');

				$this.parents('.js-exampletabs').find('.js-examplecontent').removeClass('is-open');
				$this.parents('.js-exampletabs').find('.js-exampletab').parent().removeClass('is-active');

				if( !_isOpen ) {
					$target.addClass('is-open');
					$this.parent().addClass('is-active');
				}

			});
		}
	};


	App.module = module;


}(App));


// start the module
App.module.init();