/***************************************************************************************************************************************************************
 *
 * Post to slack
 *
 **************************************************************************************************************************************************************/


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


(function SlackApp(App) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.post = function SlackPost() {

		if( !App.DEBUG ) {
			App.debugging( 'Slack: Posting', 'report' );

			var slack = new Slack( App.SLACKURL );
			var funky = 'none';
			var core = '';
			var modules = '';
			var POST = App.POST;
			var jquery = App.selectedModules.includeJquery ? 'Yes' : 'No';
			var unminJS  = App.selectedModules.includeUnminifiedJS ? 'Yes' : 'No';
			var less  = App.selectedModules.includeLess ? 'Yes' : 'No';

			if( POST.includeBond === 'on' ) {
				funky = 'Bond';
			}
			if( POST.includeStarWars === 'on' ) {
				funky = 'Star Wars';
			}

			App.selectedModules.core.forEach(function CssIterateCore( module ) {
				core += ', ' + module.ID+ ':' + module.version;
			});

			App.selectedModules.modules.forEach(function SlackIterateModules( module ) {
				modules += ', ' + module.ID+ ':' + module.version;
			});

			slack.send({
				text: 'BOOM! ... another blend!',
				attachments: [{
					'fallback': 'Details',
					'pretext': 'Details',
					'color': '#0074C4',
					'fields': [
						{
							'title': 'Modules',
							'value': 'Count: ' + App.selectedModules.modules.length + '\n' +
								'Brand: ' + App.selectedModules.brand + '\n' +
								'Core: ' + core.substr(2) + '\n' +
								'Modules: ' + modules.substr(2) + '\n' +
								'jQuery: ' + jquery + '\n' +
								'unmin JS: ' + unminJS + '\n' +
								'Less: ' + less + '\n' +
								'Funky: ' + funky,
							'short': false
						},
						{
							'title': 'Client',
							'value': 'IP: ' + App.IP,
							'short': false
						}
					],
				}],
				channel: '#blender',
				username: 'The Blender',
				icon_url: App.SLACKICON,
			});
		}
	};


	App.slack = module;


}(App));