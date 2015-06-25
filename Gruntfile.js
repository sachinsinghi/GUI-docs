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
			'assets': 'HTML/_assets',
			'js': 'HTML/_assets/js',
			'less': 'HTML/_assets/less',
			'svg': 'HTML/_assets/svg',
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
	// Custom grunt task to download the GUI files
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('downloadGUI', 'Download the GUI zip from GitHub.', function() {

		grunt.log.writeln('Downloading the GUI zip file can take a long time.');
		grunt.log.writeln( Chalk.yellow.bold('Time to replax and get a cup of tea...') );

		grunt.task.run('spinnerStart');
		grunt.task.run('curl:GUI');
		grunt.task.run('spinnerStop');

	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to create list index
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
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Replace version
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		replace: {
			example: {
				src: [
					'<%= SETTINGS.folder.fileserver %>/server.js'
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
					'<%= SETTINGS.folder.prod %>/BOM/assets/css/style-<%= pkg.version %>.min.css': '<%= SETTINGS.folder.assets %>/less/theme-BOM.less',
					'<%= SETTINGS.folder.prod %>/BSA/assets/css/style-<%= pkg.version %>.min.css': '<%= SETTINGS.folder.assets %>/less/theme-BSA.less',
					'<%= SETTINGS.folder.prod %>/STG/assets/css/style-<%= pkg.version %>.min.css': '<%= SETTINGS.folder.assets %>/less/theme-STG.less',
					'<%= SETTINGS.folder.prod %>/WBC/assets/css/style-<%= pkg.version %>.min.css': '<%= SETTINGS.folder.assets %>/less/theme-WBC.less',
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Concat node files
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		concat: {
			node: {
				src: [
					'<%= SETTINGS.folder.fileserver %>/*.js',
					'!<%= SETTINGS.folder.fileserver %>/server.js',
				],
				dest: '<%= SETTINGS.folder.fileserver %>/server.js',
			},

			js: {
				files: {
					'<%= SETTINGS.folder.prod %>/BOM/assets/js/script-<%= pkg.version %>.min.js': [
						'<%= SETTINGS.folder.js %>/**/*jquery*.js',
						'<%= SETTINGS.folder.prod %>/BOM/assets/js/script-<%= pkg.version %>.min.js',
					],
					'<%= SETTINGS.folder.prod %>/BSA/assets/js/script-<%= pkg.version %>.min.js': [
						'<%= SETTINGS.folder.js %>/**/*jquery*.js',
						'<%= SETTINGS.folder.prod %>/BSA/assets/js/script-<%= pkg.version %>.min.js',
					],
					'<%= SETTINGS.folder.prod %>/STG/assets/js/script-<%= pkg.version %>.min.js': [
						'<%= SETTINGS.folder.js %>/**/*jquery*.js',
						'<%= SETTINGS.folder.prod %>/STG/assets/js/script-<%= pkg.version %>.min.js',
					],
					'<%= SETTINGS.folder.prod %>/WBC/assets/js/script-<%= pkg.version %>.min.js': [
						'<%= SETTINGS.folder.js %>/**/*jquery*.js',
						'<%= SETTINGS.folder.prod %>/WBC/assets/js/script-<%= pkg.version %>.min.js',
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
					'<%= SETTINGS.folder.prod %>/BOM/assets/js/script-<%= pkg.version %>.min.js': [
						'<%= SETTINGS.folder.js %>/**/*.js',
						'!<%= SETTINGS.folder.js %>/**/*jquery*.js',
					],
					'<%= SETTINGS.folder.prod %>/BSA/assets/js/script-<%= pkg.version %>.min.js': [
						'<%= SETTINGS.folder.js %>/**/*.js',
						'!<%= SETTINGS.folder.js %>/**/*jquery*.js',
					],
					'<%= SETTINGS.folder.prod %>/STG/assets/js/script-<%= pkg.version %>.min.js': [
						'<%= SETTINGS.folder.js %>/**/*.js',
						'!<%= SETTINGS.folder.js %>/**/*jquery*.js',
					],
					'<%= SETTINGS.folder.prod %>/WBC/assets/js/script-<%= pkg.version %>.min.js': [
						'<%= SETTINGS.folder.js %>/**/*.js',
						'!<%= SETTINGS.folder.js %>/**/*jquery*.js',
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
				cssprefix: '.symbol-',
				enhanceSVG: true,
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

			//HTML underscore folders
			HTML_: {
				files: [{
					cwd: '<%= SETTINGS.folder.html %>/',
					src: [
						'_*/**/*.html',
						'_*/**/*.md',
						'_*/**/*.liquid',
						'_plugins/**/*',
						'!_assets/**/*',
					],
					dest: '<%= SETTINGS.folder.prod %>/',
					filter: 'isFile',
					expand: true,
				}],
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

					'!jekyll/_site/**/*',
					'!jekyll/**/assets/**/*',
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
					'wakeup',
				],
			},

			GUIjs: {
				files: [
					'<%= SETTINGS.folder.js %>/**/*.js',
				],
				tasks: [
					// 'lintspaces',
					'uglify',
					'concat:js',
					'wakeup',
				],
			},

			GUIless: {
				files: [
					'<%= SETTINGS.folder.less %>/**/*.less',
				],
				tasks: [
					// 'lintspaces',
					'less',
					'wakeup',
				],
			},

			GUIsvg: {
				files: [
					'<%= SETTINGS.folder.less %>/svg/**/*.svg',
				],
				tasks: [
					'grunticon',
					'copy',
					'clean:grunticon',
					'wakeup',
				],
			},

			GUIhtml: {
				files: [
					'<%= SETTINGS.folder.html %>/**/*.md',
					'<%= SETTINGS.folder.html %>/**/*.liquid',
					'<%= SETTINGS.folder.html %>/**/*.html',
				],
				tasks: [
					'lintspaces',
					'copy:HTMLBOM',
					'copy:HTMLBSA',
					'copy:HTMLSTG',
					'copy:HTMLWBC',
					'copy:HTML_',
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
		'clean:grunticon',
	]);

	grunt.registerTask('_buildNode', [
		'concat:node',
		'replace',
	]);


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Build tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('default', [
		'font:title',
		'_checkGUI',
		'_buildDocs',
		'_buildNode',
		'wakeup',
		'connect',
		'watch',
	]);

	grunt.registerTask('gui', [
		'font:title',
		'_checkGUI',
		'wakeup',
	]);

	grunt.registerTask('build', [
		'font:title',
		'_checkGUI',
		'_buildDocs',
		'_buildNode',
		'wakeup',
	]);

};