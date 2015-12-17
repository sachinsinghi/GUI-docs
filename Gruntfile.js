'use strict';

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//
//                                                ██████╗  ██╗   ██╗ ██╗      ██████╗   ██████╗   ██████╗ ███████╗
//                                               ██╔════╝  ██║   ██║ ██║      ██╔══██╗ ██╔═══██╗ ██╔════╝ ██╔════╝
//                                               ██║  ███╗ ██║   ██║ ██║      ██║  ██║ ██║   ██║ ██║      ███████╗
//                                               ██║   ██║ ██║   ██║ ██║      ██║  ██║ ██║   ██║ ██║      ╚════██║
//                                               ╚██████╔╝ ╚██████╔╝ ██║      ██████╔╝ ╚██████╔╝ ╚██████╗ ███████║
//                                                ╚═════╝   ╚═════╝  ╚═╝      ╚═════╝   ╚═════╝   ╚═════╝ ╚══════╝
//                                                                       Created by Westpac Design Delivery Team
// @desc     GUI docs
// @author   Dominik Wilkowski
// @website  https://github.com/WestpacCXTeam/GUI-docs
// @issues   https://github.com/WestpacCXTeam/GUI-docs/issues
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// External dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
var Crypto = require('crypto');
var Chalk = require('chalk');


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Custom functions
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
/*
 * Get a checksum of a string
 *
 * @param   string     [string]  A string for the checksum
 * @param   algorithm  [string]  The algorithm to be used, defaults back to 'sha1'
 * @param   encoding   [string]  The format for the has, defaults back to 'hex'
 *
 * @return  [string]  Hash string for checksum
 */
function checksum(string, algorithm, encoding) {
	return Crypto
		.createHash(algorithm || 'sha1')
		.update(string, 'utf8')
		.digest(encoding || 'hex');
}

/*
 * Spinner from https://github.com/dapuck/node-simple-spinner
 *
 * @method  start             Start spinner
 * @param   inv    [integer]  Set interval of animations in ms
 *
 * @method  stop              Stop spinner
 *
 * @method  change_sequence   Change the animation slides
 * @param   seq    [array]    Array of characters to be replaced one by one per animation interval
 *
 */
var Spinner = (function() {

	var sequence = ["|","/","-","\\"]; //[".", "o", "0", "@", "*"];
	var index = 0;
	var timer;

	function start(inv) {
		inv = inv || 250;
		index = 0;

		process.stdout.write(sequence[index]);
		timer = setInterval(function() {
			process.stdout.write(sequence[index].replace(/./g,"\r"));
			index = (index < sequence.length - 1) ? index + 1 : 1; //changed so animation only ever shows slide 0 in the very first round
			process.stdout.write(sequence[index]);
		},inv);
	}

	function stop() {
		clearInterval(timer);
		process.stdout.write(sequence[index].replace(/./g,"\r"));
	}

	function change_sequence(seq) {
		if(Array.isArray(seq)) {
			sequence = seq;
		}
	}

	return {
		start: start,
		stop: stop,
		change_sequence: change_sequence
	};
})();


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Settings
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
/* Spinner settings */
var progress = [
	'',
	'[ ' + Chalk.white('█') + '                          ]  downloading... ',
	'[ ' + Chalk.gray('░▒▒') + Chalk.white('██') + '                      ]  downloading... ',
	'[  ' + Chalk.gray('░▒▒') + Chalk.white('██') + '                     ]  downloading... ',
	'[   ' + Chalk.gray('░▒▒') + Chalk.white('██') + '                    ]  downloading... ',
	'[    ' + Chalk.gray('░▒▒') + Chalk.white('██') + '                   ]  downloading... ',
	'[     ' + Chalk.gray('░▒▒') + Chalk.white('██') + '                  ]  downloading... ',
	'[      ' + Chalk.gray('░▒▒') + Chalk.white('██') + '                 ]  downloading... ',
	'[       ' + Chalk.gray('░▒▒') + Chalk.white('██') + '                ]  downloading... ',
	'[        ' + Chalk.gray('░▒▒') + Chalk.white('██') + '               ]  downloading... ',
	'[         ' + Chalk.gray('░▒▒') + Chalk.white('██') + '              ]  downloading... ',
	'[          ' + Chalk.gray('░▒▒') + Chalk.white('██') + '             ]  downloading... ',
	'[           ' + Chalk.gray('░▒▒') + Chalk.white('██') + '            ]  downloading... ',
	'[            ' + Chalk.gray('░▒▒') + Chalk.white('██') + '           ]  downloading... ',
	'[             ' + Chalk.gray('░▒▒') + Chalk.white('██') + '          ]  downloading... ',
	'[              ' + Chalk.gray('░▒▒') + Chalk.white('██') + '         ]  downloading... ',
	'[               ' + Chalk.gray('░▒▒') + Chalk.white('██') + '        ]  downloading... ',
	'[                ' + Chalk.gray('░▒▒') + Chalk.white('██') + '       ]  downloading... ',
	'[                 ' + Chalk.gray('░▒▒') + Chalk.white('██') + '      ]  downloading... ',
	'[                  ' + Chalk.gray('░▒▒') + Chalk.white('██') + '     ]  downloading... ',
	'[                   ' + Chalk.gray('░▒▒') + Chalk.white('██') + '    ]  downloading... ',
	'[                    ' + Chalk.gray('░▒▒') + Chalk.white('██') + '   ]  downloading... ',
	'[                     ' + Chalk.gray('░▒▒') + Chalk.white('██') + '  ]  downloading... ',
	'[                      ' + Chalk.gray('░▒▒') + Chalk.white('██') + ' ]  downloading... ',
	'[                          ' + Chalk.white('█') + ' ]  downloading... ',
	'[                          ' + Chalk.white('█') + ' ]  downloading... ',
	'[                      ' + Chalk.white('██') + Chalk.gray('░▒▒') + ' ]  downloading... ',
	'[                     ' + Chalk.white('██') + Chalk.gray('░▒▒') + '  ]  downloading... ',
	'[                    ' + Chalk.white('██') + Chalk.gray('░▒▒') + '   ]  downloading... ',
	'[                   ' + Chalk.white('██') + Chalk.gray('░▒▒') + '    ]  downloading... ',
	'[                  ' + Chalk.white('██') + Chalk.gray('░▒▒') + '     ]  downloading... ',
	'[                 ' + Chalk.white('██') + Chalk.gray('░▒▒') + '      ]  downloading... ',
	'[                ' + Chalk.white('██') + Chalk.gray('░▒▒') + '       ]  downloading... ',
	'[               ' + Chalk.white('██') + Chalk.gray('░▒▒') + '        ]  downloading... ',
	'[              ' + Chalk.white('██') + Chalk.gray('░▒▒') + '         ]  downloading... ',
	'[             ' + Chalk.white('██') + Chalk.gray('░▒▒') + '          ]  downloading... ',
	'[            ' + Chalk.white('██') + Chalk.gray('░▒▒') + '           ]  downloading... ',
	'[           ' + Chalk.white('██') + Chalk.gray('░▒▒') + '            ]  downloading... ',
	'[          ' + Chalk.white('██') + Chalk.gray('░▒▒') + '             ]  downloading... ',
	'[         ' + Chalk.white('██') + Chalk.gray('░▒▒') + '              ]  downloading... ',
	'[        ' + Chalk.white('██') + Chalk.gray('░▒▒') + '               ]  downloading... ',
	'[       ' + Chalk.white('██') + Chalk.gray('░▒▒') + '                ]  downloading... ',
	'[      ' + Chalk.white('██') + Chalk.gray('░▒▒') + '                 ]  downloading... ',
	'[     ' + Chalk.white('██') + Chalk.gray('░▒▒') + '                  ]  downloading... ',
	'[    ' + Chalk.white('██') + Chalk.gray('░▒▒') + '                   ]  downloading... ',
	'[   ' + Chalk.white('██') + Chalk.gray('░▒▒') + '                    ]  downloading... ',
	'[  ' + Chalk.white('██') + Chalk.gray('░▒▒') + '                     ]  downloading... ',
	'[ ' + Chalk.white('██') + Chalk.gray('░▒▒') + '                      ]  downloading... ',
	'[ ' + Chalk.white('█') + '                          ]  downloading... ',
];
Spinner.change_sequence( progress );

/* SETTINGS */
var SETTINGS = function() {
	return {
		'folder': {
			'html': 'HTML',
			'modules': 'HTML/_includes/modules',
			'assets': 'HTML/_assets',
			'js': 'HTML/_assets/js',
			'less': 'HTML/_assets/less',
			'svg': 'HTML/_assets/svg',
			'css': 'HTML/_assets/css',
			'font': 'HTML/_assets/font',
			'img': 'HTML/_assets/img',
			'htaccess': 'HTML/_assets/htaccess',
			'fileserver': 'file-server',
			'temp': '.temp',
			'root': '',

			'prod': 'jekyll',
			'GUImaster': 'GUI-source-master',

			'GUIjson': 'GUI-source-master/GUI.json',
			'Packagejson': 'package.json',
		},
	};
};


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Grunt module
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
module.exports = function(grunt) {

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Dependencies
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-lintspaces');
	grunt.loadNpmTasks('grunt-grunticon');
	grunt.loadNpmTasks('grunt-wakeup');
	grunt.loadNpmTasks('grunt-jekyll');
	grunt.loadNpmTasks('grunt-font');
	grunt.loadNpmTasks('grunt-curl');
	grunt.loadNpmTasks('grunt-zip');
	require('time-grunt')(grunt);


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to start spinner
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('spinnerStart', 'Start the Spinner.', function() {
		Spinner.start( 20 );
	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to stop spinner
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('spinnerStop', 'Stop the Spinner.', function() {
		Spinner.stop();
	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to download the JSON file
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('downloadJSON', 'Download the JSON file from GitHub for validation.', function() {

		grunt.task.run('spinnerStart');
		grunt.task.run('curl:json');
		grunt.task.run('spinnerStop');

	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to download the GUI files from master
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('downloadGUI', 'Download the GUI zip from GitHub.', function() {

		grunt.log.writeln('Downloading the GUI zip file can take a long time.');
		grunt.log.writeln( Chalk.yellow.bold('Time to relax and get a cup of tea...') );

		grunt.task.run('spinnerStart');
		grunt.task.run('curl:GUI');
		grunt.task.run('spinnerStop');

	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to verify the GUI.json with the online master file
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('verifyGUI', 'Check if there is a new GUI online by comparing the GUI.json.', function() {

		try {
			var THIScontent = grunt.file.read( SETTINGS().folder.GUIjson );
		}
		catch(e) {
			grunt.log.writeln('No local GUI.json found!');
			THIScontent = '';
		}

		var GUIcontent = grunt.file.read( SETTINGS().folder.temp + '/GUI.json');

		var THIShash = checksum( THIScontent );
		var GUIhash = checksum( GUIcontent );

		if( THIShash === GUIhash ) {
			grunt.log.ok('GUI is up to date.')
		}
		else {
			grunt.task.run('font:updating');
			grunt.log.writeln('The GUI was found to be out-of-date and will now download and install.');

			grunt.task.run('downloadGUI');
			grunt.task.run('clean:GUI');
			grunt.task.run('unzip:GUI');
		}
	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to check all includes are there
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('checkIncludes', 'Check if includes and GUI.json are aligned.', function( target ) {
		var GUI = grunt.file.readJSON( SETTINGS().folder.GUIjson );
		var target = target ? target : 'dev';

		Object.keys( GUI.modules ).forEach(function iterateCategories( category ) {
			Object.keys( GUI.modules[category] ).forEach(function iterateModules( module ) {

				if( target == 'prod' && category != '_testing' || target == 'dev' ) { //exclude the _testing category all together in prod
					var moduleObj = GUI.modules[category][module];

					Object.keys( moduleObj.versions ).forEach(function interateVersions( version ) {
						var path = SETTINGS().folder.modules + '/' + module + '/' + version + '.liquid';

						grunt.verbose.writeln( 'Testing path: ' + path );

						if( !grunt.file.exists(path) ) {
							grunt.log.writeln();
							grunt.log.error('The include for the module "' + Chalk.bgWhite.red(module) + '" in version "' + Chalk.bgWhite.red(version) + '" doesn\'t exist.');
							grunt.log.writeln();
							grunt.fail.warn('Create the file in "' + Chalk.bgWhite.red(path) + Chalk.styles.yellow.open + '" to proceed: ');
						}

					});
				}
			});
		});
	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Grunt tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.initConfig({


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Package content
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		SETTINGS: SETTINGS(),
		pkg: grunt.file.readJSON( SETTINGS().folder.Packagejson ),


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Clean task
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		clean: {
			jekyll: [
				'<%= SETTINGS.folder.prod %>/',
			],

			grunticon: [
				'<%= SETTINGS.folder.prod %>/BOM/assets/css/grunticon.loader.js',
				'<%= SETTINGS.folder.prod %>/BOM/assets/css/preview.html',
				'<%= SETTINGS.folder.prod %>/BOM/assets/css/png/',

				'<%= SETTINGS.folder.prod %>/BSA/assets/css/grunticon.loader.js',
				'<%= SETTINGS.folder.prod %>/BSA/assets/css/preview.html',
				'<%= SETTINGS.folder.prod %>/BSA/assets/css/png/',

				'<%= SETTINGS.folder.prod %>/STG/assets/css/grunticon.loader.js',
				'<%= SETTINGS.folder.prod %>/STG/assets/css/preview.html',
				'<%= SETTINGS.folder.prod %>/STG/assets/css/png/',

				'<%= SETTINGS.folder.prod %>/WBC/assets/css/grunticon.loader.js',
				'<%= SETTINGS.folder.prod %>/WBC/assets/css/preview.html',
				'<%= SETTINGS.folder.prod %>/WBC/assets/css/png/',
			],

			GUI: [
				'<%= SETTINGS.folder.GUImaster %>/',
			],

			temp: [
				'<%= SETTINGS.folder.temp %>/',
			],

			testing: [
				'<%= SETTINGS.folder.prod %>/BOM/testing.md',
				'<%= SETTINGS.folder.prod %>/BSA/testing.md',
				'<%= SETTINGS.folder.prod %>/STG/testing.md',
				'<%= SETTINGS.folder.prod %>/WBC/testing.md',
			],
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Replace version
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		replace: {
			debugDev: {
				src: [
					'<%= SETTINGS.folder.prod %>/**/*.html',
					'<%= SETTINGS.folder.prod %>/**/*.md',
					'<%= SETTINGS.folder.prod %>/**/*.js',
					'<%= SETTINGS.folder.prod %>/**/*.css',
					'<%= SETTINGS.folder.prod %>/**/*.liquid',
					'<%= SETTINGS.folder.fileserver %>/server.js',
					'!<%= SETTINGS.folder.prod %>/_site/**/*',
				],
				overwrite: true,
				replacements: [
					{
						from: '[Debug]',
						to: 'true',
					},
					{
						from: '[-Debug-]',
						to: '[Debug]',
					},
				],
			},

			debugProd: {
				src: [
					'<%= SETTINGS.folder.prod %>/**/*.html',
					'<%= SETTINGS.folder.prod %>/**/*.md',
					'<%= SETTINGS.folder.prod %>/**/*.js',
					'<%= SETTINGS.folder.prod %>/**/*.css',
					'<%= SETTINGS.folder.prod %>/**/*.liquid',
					'<%= SETTINGS.folder.fileserver %>/server.js',
					'!<%= SETTINGS.folder.prod %>/_site/**/*',
				],
				overwrite: true,
				replacements: [
					{
						from: '[Debug]',
						to: 'false',
					},
					{
						from: '[-Debug-]',
						to: '[Debug]',
					},
				],
			},

			node: {
				src: [
					'<%= SETTINGS.folder.fileserver %>/server.js',
				],
				overwrite: true,
				replacements: [
					{
						from: '[Name-Version]',
						to: '<%= pkg.name %> - v<%= pkg.version %>',
					},
					{
						from: '[Version]',
						to: 'v<%= pkg.version %>',
					},
				],
			},

			jekyll: {
				src: [
					'<%= SETTINGS.folder.prod %>/_includes/**/*.liquid',
					'<%= SETTINGS.folder.prod %>/_layouts/**/*',
					'<%= SETTINGS.folder.prod %>/_data/**/*',
				],
				overwrite: true,
				replacements: [
					{
						from: '[Version]',
						to: '<%= pkg.version %>',
					},
				],
			},

			BOM: {
				src: [
					'<%= SETTINGS.folder.prod %>/BOM/**/*.js',
					'<%= SETTINGS.folder.prod %>/BOM/**/*.css',
					'<%= SETTINGS.folder.prod %>/BOM/**/*.html',
					'<%= SETTINGS.folder.prod %>/BOM/**/*.md',
					'<%= SETTINGS.folder.prod %>/BOM/**/*.liquid',
				],
				overwrite: true,
				replacements: [
					{
						from: '[Brand]',
						to: 'BOM',
					},
					{
						from: '[brand]',
						to: 'bom',
					},
					{
						from: '[Version]',
						to: '<%= pkg.version %>',
					},
				],
			},
			BSA: {
				src: [
					'<%= SETTINGS.folder.prod %>/BSA/**/*.js',
					'<%= SETTINGS.folder.prod %>/BSA/**/*.css',
					'<%= SETTINGS.folder.prod %>/BSA/**/*.html',
					'<%= SETTINGS.folder.prod %>/BSA/**/*.md',
					'<%= SETTINGS.folder.prod %>/BSA/**/*.liquid',
				],
				overwrite: true,
				replacements: [
					{
						from: '[Brand]',
						to: 'BSA',
					},
					{
						from: '[brand]',
						to: 'bsa',
					},
					{
						from: '[Version]',
						to: '<%= pkg.version %>',
					},
				],
			},
			STG: {
				src: [
					'<%= SETTINGS.folder.prod %>/STG/**/*.js',
					'<%= SETTINGS.folder.prod %>/STG/**/*.css',
					'<%= SETTINGS.folder.prod %>/STG/**/*.html',
					'<%= SETTINGS.folder.prod %>/STG/**/*.md',
					'<%= SETTINGS.folder.prod %>/STG/**/*.liquid',
				],
				overwrite: true,
				replacements: [
					{
						from: '[Brand]',
						to: 'STG',
					},
					{
						from: '[brand]',
						to: 'stg',
					},
					{
						from: '[Version]',
						to: '<%= pkg.version %>',
					},
				],
			},
			WBC: {
				src: [
					'<%= SETTINGS.folder.prod %>/WBC/**/*.js',
					'<%= SETTINGS.folder.prod %>/WBC/**/*.css',
					'<%= SETTINGS.folder.prod %>/WBC/**/*.html',
					'<%= SETTINGS.folder.prod %>/WBC/**/*.md',
					'<%= SETTINGS.folder.prod %>/WBC/**/*.liquid',
				],
				overwrite: true,
				replacements: [
					{
						from: '[Brand]',
						to: 'WBC',
					},
					{
						from: '[brand]',
						to: 'wbc',
					},
					{
						from: '[Version]',
						to: '<%= pkg.version %>',
					},
				],
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Download latest GUI
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		curl: {
			GUI: {
				src: 'https://github.com/WestpacCXTeam/GUI-source/archive/master.zip',
				dest: '<%= SETTINGS.folder.temp %>/GUI.zip',
			},

			json: {
				src: 'https://raw.githubusercontent.com/WestpacCXTeam/GUI-source/master/GUI.json',
				dest: '<%= SETTINGS.folder.temp %>/GUI.json',
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Unzip theme and move files to brands
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		unzip: {
			GUI: {
				dot: false,
				src: '<%= SETTINGS.folder.temp %>/GUI.zip',
				dest: '<%= SETTINGS.folder.root %>',
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Less task
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		less: {
			GUI: {
				options: {
					cleancss: true,
					compress: true,
					ieCompat: true,
					report: 'min',
					plugins : [ new (require('less-plugin-autoprefix'))({ browsers: [ 'last 2 versions', 'ie 8', 'ie 9', 'ie 10' ] }) ],
				},
				files: {
					'<%= SETTINGS.folder.prod %>/BOM/assets/css/site-<%= pkg.version %>.min.css': '<%= SETTINGS.folder.assets %>/less/theme-BOM.less',
					'<%= SETTINGS.folder.prod %>/BSA/assets/css/site-<%= pkg.version %>.min.css': '<%= SETTINGS.folder.assets %>/less/theme-BSA.less',
					'<%= SETTINGS.folder.prod %>/STG/assets/css/site-<%= pkg.version %>.min.css': '<%= SETTINGS.folder.assets %>/less/theme-STG.less',
					'<%= SETTINGS.folder.prod %>/WBC/assets/css/site-<%= pkg.version %>.min.css': '<%= SETTINGS.folder.assets %>/less/theme-WBC.less',
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Concat files
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		concat: {
			node: {
				src: [
					'<%= SETTINGS.folder.fileserver %>/*.js',
					'!<%= SETTINGS.folder.fileserver %>/server.js',
					'!<%= SETTINGS.folder.fileserver %>/-*.js',
				],
				dest: '<%= SETTINGS.folder.fileserver %>/server.js',
			},

			grunticonBOM: {
				files: {
					'<%= SETTINGS.folder.prod %>/BOM/assets/css/symbols-<%= pkg.version %>.data.svg.css': [
						'<%= SETTINGS.folder.prod %>/BOM/assets/css/symbols-<%= pkg.version %>.data.svg.css',
						'<%= SETTINGS.folder.css %>/BOM/symbols.data.svg.css',
					],
					'<%= SETTINGS.folder.prod %>/BOM/assets/css/symbols-<%= pkg.version %>.data.png.css': [
						'<%= SETTINGS.folder.prod %>/BOM/assets/css/symbols-<%= pkg.version %>.data.png.css',
						'<%= SETTINGS.folder.css %>/BOM/symbols.data.png.css',
					],
					'<%= SETTINGS.folder.prod %>/BOM/assets/css/symbols-<%= pkg.version %>.fallback.css': [
						'<%= SETTINGS.folder.prod %>/BOM/assets/css/symbols-<%= pkg.version %>.fallback.css',
						'<%= SETTINGS.folder.css %>/BOM/symbols.fallback.css',
					],
				},
			},

			grunticonBSA: {
				files: {
					'<%= SETTINGS.folder.prod %>/BSA/assets/css/symbols-<%= pkg.version %>.data.svg.css': [
						'<%= SETTINGS.folder.prod %>/BSA/assets/css/symbols-<%= pkg.version %>.data.svg.css',
						'<%= SETTINGS.folder.css %>/BSA/symbols.data.svg.css',
					],
					'<%= SETTINGS.folder.prod %>/BSA/assets/css/symbols-<%= pkg.version %>.data.png.css': [
						'<%= SETTINGS.folder.prod %>/BSA/assets/css/symbols-<%= pkg.version %>.data.png.css',
						'<%= SETTINGS.folder.css %>/BSA/symbols.data.png.css',
					],
					'<%= SETTINGS.folder.prod %>/BSA/assets/css/symbols-<%= pkg.version %>.fallback.css': [
						'<%= SETTINGS.folder.prod %>/BSA/assets/css/symbols-<%= pkg.version %>.fallback.css',
						'<%= SETTINGS.folder.css %>/BSA/symbols.fallback.css',
					],
				},
			},

			grunticonSTG: {
				files: {
					'<%= SETTINGS.folder.prod %>/STG/assets/css/symbols-<%= pkg.version %>.data.svg.css': [
						'<%= SETTINGS.folder.prod %>/STG/assets/css/symbols-<%= pkg.version %>.data.svg.css',
						'<%= SETTINGS.folder.css %>/STG/symbols.data.svg.css',
					],
					'<%= SETTINGS.folder.prod %>/STG/assets/css/symbols-<%= pkg.version %>.data.png.css': [
						'<%= SETTINGS.folder.prod %>/STG/assets/css/symbols-<%= pkg.version %>.data.png.css',
						'<%= SETTINGS.folder.css %>/STG/symbols.data.png.css',
					],
					'<%= SETTINGS.folder.prod %>/STG/assets/css/symbols-<%= pkg.version %>.fallback.css': [
						'<%= SETTINGS.folder.prod %>/STG/assets/css/symbols-<%= pkg.version %>.fallback.css',
						'<%= SETTINGS.folder.css %>/STG/symbols.fallback.css',
					],
				},
			},

			grunticonWBC: {
				files: {
					'<%= SETTINGS.folder.prod %>/WBC/assets/css/symbols-<%= pkg.version %>.data.svg.css': [
						'<%= SETTINGS.folder.prod %>/WBC/assets/css/symbols-<%= pkg.version %>.data.svg.css',
						'<%= SETTINGS.folder.css %>/WBC/symbols.data.svg.css',
					],
					'<%= SETTINGS.folder.prod %>/WBC/assets/css/symbols-<%= pkg.version %>.data.png.css': [
						'<%= SETTINGS.folder.prod %>/WBC/assets/css/symbols-<%= pkg.version %>.data.png.css',
						'<%= SETTINGS.folder.css %>/WBC/symbols.data.png.css',
					],
					'<%= SETTINGS.folder.prod %>/WBC/assets/css/symbols-<%= pkg.version %>.fallback.css': [
						'<%= SETTINGS.folder.prod %>/WBC/assets/css/symbols-<%= pkg.version %>.fallback.css',
						'<%= SETTINGS.folder.css %>/WBC/symbols.fallback.css',
					],
				},
			},

			js: {
				files: {
					'<%= SETTINGS.folder.prod %>/BOM/assets/js/site-<%= pkg.version %>.min.js': [
						'<%= SETTINGS.folder.js %>/**/*jquery*.js',
						'<%= SETTINGS.folder.js %>/**/*store*.js',
						'<%= SETTINGS.folder.prod %>/BOM/assets/js/site-<%= pkg.version %>.min.js',
					],
					'<%= SETTINGS.folder.prod %>/BSA/assets/js/site-<%= pkg.version %>.min.js': [
						'<%= SETTINGS.folder.js %>/**/*jquery*.js',
						'<%= SETTINGS.folder.js %>/**/*store*.js',
						'<%= SETTINGS.folder.prod %>/BSA/assets/js/site-<%= pkg.version %>.min.js',
					],
					'<%= SETTINGS.folder.prod %>/STG/assets/js/site-<%= pkg.version %>.min.js': [
						'<%= SETTINGS.folder.js %>/**/*jquery*.js',
						'<%= SETTINGS.folder.js %>/**/*store*.js',
						'<%= SETTINGS.folder.prod %>/STG/assets/js/site-<%= pkg.version %>.min.js',
					],
					'<%= SETTINGS.folder.prod %>/WBC/assets/js/site-<%= pkg.version %>.min.js': [
						'<%= SETTINGS.folder.js %>/**/*jquery*.js',
						'<%= SETTINGS.folder.js %>/**/*store*.js',
						'<%= SETTINGS.folder.prod %>/WBC/assets/js/site-<%= pkg.version %>.min.js',
					],
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Minify js
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		uglify: {
			options: {
				mangle: false,
				report: 'gzip',
			},

			BOM: {
				files: {
					'<%= SETTINGS.folder.prod %>/BOM/assets/js/site-<%= pkg.version %>.min.js': [
						'<%= SETTINGS.folder.js %>/**/*.js',
						'!<%= SETTINGS.folder.js %>/**/*jquery*.js',
						'!<%= SETTINGS.folder.js %>/**/*store*.js',
					],
					'<%= SETTINGS.folder.prod %>/BSA/assets/js/site-<%= pkg.version %>.min.js': [
						'<%= SETTINGS.folder.js %>/**/*.js',
						'!<%= SETTINGS.folder.js %>/**/*jquery*.js',
						'!<%= SETTINGS.folder.js %>/**/*store*.js',
					],
					'<%= SETTINGS.folder.prod %>/STG/assets/js/site-<%= pkg.version %>.min.js': [
						'<%= SETTINGS.folder.js %>/**/*.js',
						'!<%= SETTINGS.folder.js %>/**/*jquery*.js',
						'!<%= SETTINGS.folder.js %>/**/*store*.js',
					],
					'<%= SETTINGS.folder.prod %>/WBC/assets/js/site-<%= pkg.version %>.min.js': [
						'<%= SETTINGS.folder.js %>/**/*.js',
						'!<%= SETTINGS.folder.js %>/**/*jquery*.js',
						'!<%= SETTINGS.folder.js %>/**/*store*.js',
					],
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Grunticon to convert svgs into cross browser css files with png fallbacks
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		grunticon: {
			options: {
				datasvgcss: 'symbols-<%= pkg.version %>.data.svg.css',
				datapngcss: 'symbols-<%= pkg.version %>.data.png.css',
				urlpngcss: 'symbols-<%= pkg.version %>.fallback.css',
				cssprefix: '.sitesymbol-',
				enhanceSVG: true,
				customselectors: {
					'header-bg': ['.header .headerline'],
				},
				pngpath: '../img',
			},

			BOM: {
				files: [{
					expand: true,
					cwd: '<%= SETTINGS.folder.svg %>/',
					src: [
						'all/*.svg',
						'BOM/*.svg',
					],
					dest: '<%= SETTINGS.folder.prod %>/BOM/assets/css',
				}],
			},

			BSA: {
				files: [{
					expand: true,
					cwd: '<%= SETTINGS.folder.svg %>/',
					src: [
						'all/*.svg',
						'BSA/*.svg',
					],
					dest: '<%= SETTINGS.folder.prod %>/BSA/assets/css',
				}],
			},

			STG: {
				files: [{
					expand: true,
					cwd: '<%= SETTINGS.folder.svg %>/',
					src: [
						'all/*.svg',
						'STG/*.svg',
					],
					dest: '<%= SETTINGS.folder.prod %>/STG/assets/css',
				}],
			},

			WBC: {
				files: [{
					expand: true,
					cwd: '<%= SETTINGS.folder.svg %>/',
					src: [
						'all/*.svg',
						'WBC/*.svg',
					],
					dest: '<%= SETTINGS.folder.prod %>/WBC/assets/css',
				}],
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Copy all grunticon fallback pngs to img folder
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		copy: {
			//grunticon cleanup
			BOM: {
				files: [{
					cwd: '<%= SETTINGS.folder.prod %>/BOM/assets/css/png/',
					src: ['**/*.png'],
					dest: '<%= SETTINGS.folder.prod %>/BOM/assets/img/',
					filter: 'isFile',
					expand: true,
				}],
			},
			BSA: {
				files: [{
					cwd: '<%= SETTINGS.folder.prod %>/BSA/assets/css/png/',
					src: ['**/*.png'],
					dest: '<%= SETTINGS.folder.prod %>/BSA/assets/img/',
					filter: 'isFile',
					expand: true,
				}],
			},
			STG: {
				files: [{
					cwd: '<%= SETTINGS.folder.prod %>/STG/assets/css/png/',
					src: ['**/*.png'],
					dest: '<%= SETTINGS.folder.prod %>/STG/assets/img/',
					filter: 'isFile',
					expand: true,
				}],
			},
			WBC: {
				files: [{
					cwd: '<%= SETTINGS.folder.prod %>/WBC/assets/css/png/',
					src: ['**/*.png'],
					dest: '<%= SETTINGS.folder.prod %>/WBC/assets/img/',
					filter: 'isFile',
					expand: true,
				}],
			},

			//HTML
			HTMLBOM: {
				files: [{
					cwd: '<%= SETTINGS.folder.html %>/',
					src: [
						'**/*.html',
						'**/*.md',
						'**/*.liquid',
						'!_assets/**/*',
						'!_*/**/*',
					],
					dest: '<%= SETTINGS.folder.prod %>/BOM/',
					filter: 'isFile',
					expand: true,
				}],
			},
			HTMLBSA: {
				files: [{
					cwd: '<%= SETTINGS.folder.html %>/',
					src: [
						'**/*.html',
						'**/*.md',
						'**/*.liquid',
						'!_assets/**/*',
						'!_*/**/*',
					],
					dest: '<%= SETTINGS.folder.prod %>/BSA/',
					filter: 'isFile',
					expand: true,
				}],
			},
			HTMLSTG: {
				files: [{
					cwd: '<%= SETTINGS.folder.html %>/',
					src: [
						'**/*.html',
						'**/*.md',
						'**/*.liquid',
						'!_assets/**/*',
						'!_*/**/*',
					],
					dest: '<%= SETTINGS.folder.prod %>/STG/',
					filter: 'isFile',
					expand: true,
				}],
			},
			HTMLWBC: {
				files: [{
					cwd: '<%= SETTINGS.folder.html %>/',
					src: [
						'**/*.html',
						'**/*.md',
						'**/*.liquid',
						'!_assets/**/*',
						'!_*/**/*',
					],
					dest: '<%= SETTINGS.folder.prod %>/WBC/',
					filter: 'isFile',
					expand: true,
				}],
			},

			//fonts
			fontsBOM: {
				files: [{
					cwd: '<%= SETTINGS.folder.font %>/BOM/',
					src: [
						'**/*.eot',
						'**/*.svg',
						'**/*.ttf',
						'**/*.woff',
						'**/*.woff2',
					],
					dest: '<%= SETTINGS.folder.prod %>/BOM/assets/font/',
					filter: 'isFile',
					expand: true,
				}],
			},
			fontsBSA: {
				files: [{
					cwd: '<%= SETTINGS.folder.font %>/BSA/',
					src: [
						'**/*.eot',
						'**/*.svg',
						'**/*.ttf',
						'**/*.woff',
						'**/*.woff2',
					],
					dest: '<%= SETTINGS.folder.prod %>/BSA/assets/font/',
					filter: 'isFile',
					expand: true,
				}],
			},
			fontsSTG: {
				files: [{
					cwd: '<%= SETTINGS.folder.font %>/STG/',
					src: [
						'**/*.eot',
						'**/*.svg',
						'**/*.ttf',
						'**/*.woff',
						'**/*.woff2',
					],
					dest: '<%= SETTINGS.folder.prod %>/STG/assets/font/',
					filter: 'isFile',
					expand: true,
				}],
			},
			fontsWBC: {
				files: [{
					cwd: '<%= SETTINGS.folder.font %>/WBC/',
					src: [
						'**/*.eot',
						'**/*.svg',
						'**/*.ttf',
						'**/*.woff',
						'**/*.woff2',
					],
					dest: '<%= SETTINGS.folder.prod %>/WBC/assets/font/',
					filter: 'isFile',
					expand: true,
				}],
			},

			//images
			imgBOM: {
				files: [{
					cwd: '<%= SETTINGS.folder.img %>/BOM/',
					src: [
						'**/*.png',
						'**/*.jpg',
					],
					dest: '<%= SETTINGS.folder.prod %>/BOM/assets/img/',
					filter: 'isFile',
					expand: true,
				}],
			},
			imgBSA: {
				files: [{
					cwd: '<%= SETTINGS.folder.img %>/BSA/',
					src: [
						'**/*.png',
						'**/*.jpg',
					],
					dest: '<%= SETTINGS.folder.prod %>/BSA/assets/img/',
					filter: 'isFile',
					expand: true,
				}],
			},
			imgSTG: {
				files: [{
					cwd: '<%= SETTINGS.folder.img %>/STG/',
					src: [
						'**/*.png',
						'**/*.jpg',
					],
					dest: '<%= SETTINGS.folder.prod %>/STG/assets/img/',
					filter: 'isFile',
					expand: true,
				}],
			},
			imgWBC: {
				files: [{
					cwd: '<%= SETTINGS.folder.img %>/WBC/',
					src: [
						'**/*.png',
						'**/*.jpg',
					],
					dest: '<%= SETTINGS.folder.prod %>/WBC/assets/img/',
					filter: 'isFile',
					expand: true,
				}],
			},

			//htaccess files
			htaccessBOM: {
				files: [{
					cwd: '<%= SETTINGS.folder.htaccess %>/BOM/',
					src: [
						'*.htaccess',
						'.htaccess',
					],
					dest: '<%= SETTINGS.folder.prod %>/BOM/',
					filter: 'isFile',
					expand: true,
				}],
			},
			htaccessBSA: {
				files: [{
					cwd: '<%= SETTINGS.folder.htaccess %>/BSA/',
					src: [
						'*.htaccess',
						'.htaccess',
					],
					dest: '<%= SETTINGS.folder.prod %>/BSA/',
					filter: 'isFile',
					expand: true,
				}],
			},
			htaccessSTG: {
				files: [{
					cwd: '<%= SETTINGS.folder.htaccess %>/STG/',
					src: [
						'*.htaccess',
						'.htaccess',
					],
					dest: '<%= SETTINGS.folder.prod %>/STG/',
					filter: 'isFile',
					expand: true,
				}],
			},
			htaccessWBC: {
				files: [{
					cwd: '<%= SETTINGS.folder.htaccess %>/WBC/',
					src: [
						'*.htaccess',
						'.htaccess',
					],
					dest: '<%= SETTINGS.folder.prod %>/WBC/',
					filter: 'isFile',
					expand: true,
				}],
			},

			//HTML underscore folders
			HTML_: {
				files: [{
					cwd: '<%= SETTINGS.folder.html %>/',
					src: [
						'_*/**/*.html',
						'_*/**/*.md',
						'_*/**/*.liquid',
						'*.yml',
						'*.htaccess',
						'.htaccess',
						'*.json',
						'_plugins/**/*',
						'!_assets/**/*',
					],
					dest: '<%= SETTINGS.folder.prod %>/',
					filter: 'isFile',
					expand: true,
				}],
			},

			//GUI.json
			GUIjson: {
				files: [{
					cwd: '<%= SETTINGS.folder.GUImaster %>/',
					src: [
						'GUI.json',
					],
					dest: '<%= SETTINGS.folder.prod %>/_data',
					filter: 'isFile',
					expand: true,
				}],
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// JEKYLL
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		jekyll: {
			options: {
				src : '<%= SETTINGS.folder.prod %>'
			},

			dev: {
				options: {
					dest: '<%= SETTINGS.folder.prod %>/_site',
					config: '<%= SETTINGS.folder.prod %>/_config.yml',
				},
			},
			prod: {
				options: {
					dest: '<%= SETTINGS.folder.prod %>/_site',
					config: '<%= SETTINGS.folder.prod %>/_config.build.yml',
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// LINT SPACES
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		lintspaces: {
			all: {
				options: {
					editorconfig: '.editorconfig',
					ignores: [
						'js-comments',
						'c-comments',
						'java-comments',
						'as-comments',
						'xml-comments',
						'html-comments',
						'python-comments',
						'ruby-comments',
						'applescript-comments',
					],
				},
				src: [
					'**/*.js',
					'**/*.less',
					'**/*.css',
					'**/*.html',

					'!jekyll/**/*',
					'!HTML/_assets/js/**/*jquery*.js',
					'!GUI-source-master/**/*',
					'!file-server/server.js',
					'!file-server/node_modules/**/*',
					'!node_modules/**/*',
					'!Gruntfile.js',
				],
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Banners
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		font: {
			options: {
				space: false,
				maxLength: 11,
				colors: ['white', 'gray'],
			},

			title: {
				text: '| GUI docs',
			},

			updating: {
				options: {
					font: 'simple',
					maxLength: 30,
					colors: ['magenta'],
				},

				text: 'Updating...',
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Wakeup
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		wakeup: {
			wakeme: {
				options: {
					randomize: true,
					notifications: true,
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Watch
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		watch: {
			node: {
				files: [
					'<%= SETTINGS.folder.fileserver %>/*.js',
					'!<%= SETTINGS.folder.fileserver %>/server.js',
				],
				tasks: [
					// 'lintspaces',
					'_buildNode',
					'replace:node',
					'replace:debugDev',
					'wakeup',
				],
			},

			js: {
				files: [
					'<%= SETTINGS.folder.js %>/**/*.js',
				],
				tasks: [
					// 'lintspaces',
					'uglify',
					'concat:js',
					'replace:jekyll',
					'replace:BOM',
					'replace:BSA',
					'replace:STG',
					'replace:WBC',
					'replace:debugDev',
					'jekyll:dev',
					'wakeup',
				],
			},

			less: {
				files: [
					'<%= SETTINGS.folder.less %>/**/*.less',
				],
				tasks: [
					// 'lintspaces',
					'less',
					'replace:jekyll',
					'replace:BOM',
					'replace:BSA',
					'replace:STG',
					'replace:WBC',
					'replace:debugDev',
					'jekyll:dev',
					'wakeup',
				],
			},

			svg: {
				files: [
					'<%= SETTINGS.folder.less %>/svg/**/*.svg',
				],
				tasks: [
					'grunticon',
					'copy',
					'concat:grunticonBOM',
					'concat:grunticonBSA',
					'concat:grunticonSTG',
					'concat:grunticonWBC',
					'clean:grunticon',
					'jekyll:dev',
					'wakeup',
				],
			},

			html: {
				files: [
					'<%= SETTINGS.folder.html %>/**/*.md',
					'<%= SETTINGS.folder.html %>/**/*.liquid',
					'<%= SETTINGS.folder.html %>/**/*.html',
					'<%= SETTINGS.folder.html %>/**/*.yml',
					'<%= SETTINGS.folder.html %>/**/*.json',
					'<%= SETTINGS.folder.html %>/_plugins/**/*',
				],
				tasks: [
					// 'lintspaces',
					'copy:HTMLBOM',
					'copy:HTMLBSA',
					'copy:HTMLSTG',
					'copy:HTMLWBC',
					'copy:HTML_',
					'replace:jekyll',
					'replace:BOM',
					'replace:BSA',
					'replace:STG',
					'replace:WBC',
					'replace:debugDev',
					'jekyll:dev',
					'wakeup',
				],
			},

			htaccess: {
				files: [
					'<%= SETTINGS.folder.htaccess %>/**/*.htaccess',
					'<%= SETTINGS.folder.htaccess %>/**/.htaccess',
				],
				tasks: [
					// 'lintspaces',
					'copy:htaccessBOM',
					'copy:htaccessBSA',
					'copy:htaccessSTG',
					'copy:htaccessWBC',
					'jekyll:dev',
					'wakeup',
				],
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// server
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		connect: {
			server: {
				options: {
					open: false,
					hostname: '127.0.0.1',
					port: 1337,
					directory: '<%= SETTINGS.folder.prod %>/_site/',
					base: '<%= SETTINGS.folder.prod %>/_site/',
				},
			},
		},

	});



	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Private tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('_checkGUI', [
		'clean:temp',
		'downloadJSON',
		'verifyGUI',
		'clean:temp',
	]);

	grunt.registerTask('_buildDocs', [
		'clean:jekyll',
		// 'lintspaces',
		'less',
		'uglify',
		'concat:js',
		'grunticon',
		'copy',
		'concat:grunticonBOM',
		'concat:grunticonBSA',
		'concat:grunticonSTG',
		'concat:grunticonWBC',
		'replace:jekyll',
		'replace:BOM',
		'replace:BSA',
		'replace:STG',
		'replace:WBC',
		'clean:grunticon',
	]);

	grunt.registerTask('_buildNode', [
		'concat:node',
		'replace:node',
	]);


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Build tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('default', [ //run build with watch
		'build',
		'connect',
		'watch',
	]);

	grunt.registerTask('node', [ //run only node build and watch
		'font:title',
		'_buildNode',
		'wakeup',
		'watch',
	]);

	grunt.registerTask('checkGui', [ //check gui
		'font:title',
		'downloadJSON',
		'verifyGUI',
		'wakeup',
	]);

	grunt.registerTask('gui', [ //check gui
		'font:title',
		'font:updating',
		'downloadGUI',
		'clean:GUI',
		'unzip:GUI',
		'wakeup',
	]);

	grunt.registerTask('build', [ //run everything with debug on
		'font:title',
		'_checkGUI',
		'_buildDocs',
		'_buildNode',
		'replace:debugDev',
		'checkIncludes:dev',
		'jekyll:dev',
		'wakeup',
	]);

	grunt.registerTask('building', [ //run everything with debug on without gui check
		'font:title',
		'_buildDocs',
		'_buildNode',
		'replace:debugDev',
		'checkIncludes:dev',
		'jekyll:dev',
		'wakeup',
	]);

	grunt.registerTask('prod', [ //run everything with debug off
		'font:title',
		'_checkGUI',
		'_buildDocs',
		'_buildNode',
		'replace:debugProd',
		'checkIncludes:prod',
		'clean:testing',
		'jekyll:prod',
		'wakeup',
	]);

	grunt.registerTask('proding', [ //run everything with debug off without gui check
		'font:title',
		'_buildDocs',
		'_buildNode',
		'replace:debugProd',
		'checkIncludes:prod',
		'clean:testing',
		'jekyll:prod',
		'wakeup',
	]);

};