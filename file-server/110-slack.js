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
		App.debugging( 'Slack: Posting', 'report' );

		var slack = new Slack( App.SLACKURL );
		var modules = '';

		App.selectedModules.modules.forEach(function SlackIterateModules( module ) {
			modules += ', ' + module.ID+ ':' + module.version;
		});

		if( !App.DEBUG ) {
			slack.send({
				text: 'A new blend was just downloaded.',
				attachments: [{
					'fallback': 'Details',
					'pretext': 'Details',
					'color': '#0074C4',
					'fields': [
						{
							'title': 'Modules',
							'value': 'Count: ' + App.selectedModules.modules.length + '\nModules: ' + modules.substr(2),
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