/***************************************************************************************************************************************************************
 *
 * Funky stuff
 *
 **************************************************************************************************************************************************************/


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


(function FunkyApp(App) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.get = function funkyPost() {
		App.debugging( 'funky: Getting funky stuff', 'report' );

		var POST = App.POST;
		var _includeBond = POST.includeBond === 'on';
		var _includeStarWars = POST.includeStarWars === 'on';

		if( _includeBond ) { //BOND
			App.debugging( 'funky: Getting James Bond reference', 'report' );

			App.zip.queuing('funky', false);
			App.zip.addPath( App.GELPATH + 'assets/img/bond.png', '/bond.png' );
		}
		else if( _includeStarWars ) { //STAR WARS
			App.debugging( 'funky: Getting Star Wars reference', 'report' );

			App.zip.queuing('funky', false);
			App.zip.addPath( App.GELPATH + '/GUI/' + POST['brand'] + '/assets/img/starwars' + POST['brand'] + '.jpg', '/starwars.png' );
		}
		else {
			App.zip.queuing('funky', false);
			App.zip.readyZip();
		}
	};


	App.funky = module;


}(App));