/***************************************************************************************************************************************************************
 *
 * Pokemon jokes
 *
 **************************************************************************************************************************************************************/


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


(function(App) {

	var module = {};

	module.max = 151;             //how many do we have?
	module.path = 'assets/img/';  //the path to the img asset

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function() {
		App.debugging( 'Pokemon: Initiating', 'report' );

		if( $('.js-canvas').length ) {
			$('<img/>')
				.attr('src', App.pokemon.path + 'ball-explode.gif')
				.css({
					opacity: 0,
					position: 'absolute',
					visibility: 'none',
					height: '1px',
					width: '1px',
				})
				.appendTo('.js-canvas');

			setTimeout(function() {
				App.pokemon.appear();
			}, 10000);
		}
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Module appear method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.appear = function() {
		var pokemonID = Math.floor( Math.random() * ( App.pokemon.max + 1 ) );
		var pokemon = App.pokemon.path + 'pokemon' + pokemonID + '.png';

		var top = Math.floor( Math.random() * ( $('.js-canvas').height() - 140 + 1 ) + 140 );
		var left = Math.floor( Math.random() * ( $('.js-canvas').width() + 1 ) );

		App.debugging( 'Pokemon: A wild Pokemon(' + pokemonID + ') appears at: top: ' + top + ', left: ' + left, 'report' );

		$('<img/>')
			.attr('src', pokemon)
			.addClass('js-pokemon')
			.css({
				position: 'absolute',
				left: left,
				top: top,
				width: '124px',
				zIndex: 70,
				cursor: 'pointer',
			})
			.one('click', function() {
				_gaq.push(['_trackEvent', 'Pokemon', 'caught', 'A pokemon was caught']); //track the button

				$(this)
					.attr('src', App.pokemon.path + 'ball-explode.gif')
					.css({
						width: '108px',
					});

				setTimeout(function() {
					$('.js-pokemon').remove();
				}, 2000);

				setTimeout(function() {
					App.pokemon.appear();
				}, 30000);
			})
			.appendTo('.js-canvas');
	};


	App.pokemon = module;


}(App));


// start the module
App.pokemon.init();