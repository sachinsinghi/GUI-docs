'use strict';

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//
//                                                ██████╗  ██╗   ██╗ ██╗      ██████╗   ██████╗   ██████╗ ███████╗
//                                               ██╔════╝  ██║   ██║ ██║      ██╔══██╗ ██╔═══██╗ ██╔════╝ ██╔════╝
//                                               ██║  ███╗ ██║   ██║ ██║      ██║  ██║ ██║   ██║ ██║      ███████╗
//                                               ██║   ██║ ██║   ██║ ██║      ██║  ██║ ██║   ██║ ██║      ╚════██║
//                                               ╚██████╔╝ ╚██████╔╝ ██║      ██████╔╝ ╚██████╔╝ ╚██████╗ ███████║
//                                                ╚═════╝   ╚═════╝  ╚═╝      ╚═════╝   ╚═════╝   ╚═════╝ ╚══════╝
//                                                                       Created by Westpac digital
// @desc     GUI docs
// @author   Dominik Wilkowski
// @website  https://github.com/WestpacCXTeam/GUI-docs
// @issues   https://github.com/WestpacCXTeam/GUI-docs/issues
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// External dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
var Spinner = require('simple-spinner');
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
 * Set progress for the spinner
 */
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
		grunt.log.writeln( Chalk.yellow.bold('Time to replax and get a tea.') );

		grunt.task.run('spinnerStart');
		grunt.task.run('curl:GUI');
		grunt.task.run('spinnerStop');

	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to create list index
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('verifyGUI', 'Check if there is a new GUI online by comparing the GUI.json.', function() {

		try {
			var THIScontent = grunt.file.read('./GUI-source-master/GUI.json');
		}
		catch(e) {
			grunt.log.writeln('No local GUI.json found!');
			THIScontent = '';
		}

		var GUIcontent = grunt.file.read('./.temp/GUI.json');

		var THIShash = checksum( THIScontent );
		var GUIhash = checksum( GUIcontent );

		if( THIShash === GUIhash ) {
			grunt.task.run('font:uptodate');
		}
		else {
			grunt.task.run('font:updating');
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
		pkg: grunt.file.readJSON('./package.json'),


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Clean task
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		clean: {
			assets: [
				'./jekyll/BOM/assets/',
				'./jekyll/BSA/assets/',
				'./jekyll/STG/assets/',
				'./jekyll/WBC/assets/',
			],

			grunticon: [
				'./jekyll/BOM/assets/css/grunticon.loader.js',
				'./jekyll/BOM/assets/css/preview.html',
				'./jekyll/BOM/assets/css/png/',

				'./jekyll/BSA/assets/css/grunticon.loader.js',
				'./jekyll/BSA/assets/css/preview.html',
				'./jekyll/BSA/assets/css/png/',

				'./jekyll/STG/assets/css/grunticon.loader.js',
				'./jekyll/STG/assets/css/preview.html',
				'./jekyll/STG/assets/css/png/',

				'./jekyll/WBC/assets/css/grunticon.loader.js',
				'./jekyll/WBC/assets/css/preview.html',
				'./jekyll/WBC/assets/css/png/',
			],

			GUI: [
				'./GUI-source-master/',
			],

			temp: [
				'./.temp/',
			],
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Replace version
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		replace: {
			example: {
				src: [
					'./file-server/server.js'
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
				dest: './.temp/GUI.zip',
			},

			json: {
				src: 'https://raw.githubusercontent.com/WestpacCXTeam/GUI-source/master/GUI.json',
				dest: './.temp/GUI.json',
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Unzip theme and move files to brands
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		unzip: {
			GUI: {
				dot: false,
				src: './.temp/GUI.zip',
				dest: './',
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Concat node files
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		concat: {
			node: {
				src: [
					'./file-server/*.js',
					'!./file-server/server.js',
				],
				dest: './file-server/server.js',
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
					'./jekyll/BOM/assets/css/style-<%= pkg.version %>.min.css': './assets/less/theme-BOM.less',
					'./jekyll/BSA/assets/css/style-<%= pkg.version %>.min.css': './assets/less/theme-BSA.less',
					'./jekyll/STG/assets/css/style-<%= pkg.version %>.min.css': './assets/less/theme-STG.less',
					'./jekyll/WBC/assets/css/style-<%= pkg.version %>.min.css': './assets/less/theme-WBC.less',
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
					'./jekyll/BOM/assets/js/script-<%= pkg.version %>.min.js': './assets/js/**/*.js',
					'./jekyll/BSA/assets/js/script-<%= pkg.version %>.min.js': './assets/js/**/*.js',
					'./jekyll/STG/assets/js/script-<%= pkg.version %>.min.js': './assets/js/**/*.js',
					'./jekyll/WBC/assets/js/script-<%= pkg.version %>.min.js': './assets/js/**/*.js',
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
					cwd: './assets/svg/',
					src: [
						'all/*.svg',
						'BOM/*.svg',
					],
					dest: './jekyll/BOM/assets/css',
				}],
			},

			BSA: {
				files: [{
					expand: true,
					cwd: './assets/svg/',
					src: [
						'all/*.svg',
						'BSA/*.svg',
					],
					dest: './jekyll/BSA/assets/css',
				}],
			},

			STG: {
				files: [{
					expand: true,
					cwd: './assets/svg/',
					src: [
						'all/*.svg',
						'STG/*.svg',
					],
					dest: './jekyll/STG/assets/css',
				}],
			},

			WBC: {
				files: [{
					expand: true,
					cwd: './assets/svg/',
					src: [
						'all/*.svg',
						'WBC/*.svg',
					],
					dest: './jekyll/WBC/assets/css',
				}],
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Copy all grunticon fallback pngs to img folder
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		copy: {
			BOKM: {
				files: [{
					cwd: './jekyll/BOKM/assets/css/png/',
					src: ['**/*.png'],
					dest: './jekyll/BOKM/assets/img/',
					filter: 'isFile',
					expand: true,
				}],
			},
			BSA: {
				files: [{
					cwd: './jekyll/BSA/assets/css/png/',
					src: ['**/*.png'],
					dest: './jekyll/BSA/assets/img/',
					filter: 'isFile',
					expand: true,
				}],
			},
			STG: {
				files: [{
					cwd: './jekyll/STG/assets/css/png/',
					src: ['**/*.png'],
					dest: './jekyll/STG/assets/img/',
					filter: 'isFile',
					expand: true,
				}],
			},
			WBC: {
				files: [{
					cwd: './jekyll/WBC/assets/css/png/',
					src: ['**/*.png'],
					dest: './jekyll/WBC/assets/img/',
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
					'!GUI-source-master/**/*',
					'!file-server/server.js',
					'!file-server/node_modules/**/*',
					'!node_modules/**/*',
					'!**/*.svg',
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

			uptodate: {
				options: {
					font: 'simple',
					maxLength: 30,
					colors: ['magenta'],
				},

				text: 'Up to date',
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
					'./file-server/*.js',
					'!./file-server/server.js',
				],
				tasks: [
					'_buildNode',
					'wakeup',
				],
			},

			GUIjs: {
				files: [
					'./assets/js/**/*.js',
				],
				tasks: [
					'lintspaces',
					'uglify',
					'wakeup',
				],
			},

			GUIless: {
				files: [
					'./assets/less/**/*.less',
				],
				tasks: [
					'lintspaces',
					'less',
					'wakeup',
				],
			},

			GUIsvg: {
				files: [
					'./assets/svg/**/*.svg',
				],
				tasks: [
					'grunticon',
					'copy',
					'clean:grunticon',
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
					directory: './jekyll/_site/',
					base: './jekyll/_site/',
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
		'clean:assets',
		'lintspaces',
		'less',
		'uglify',
		'grunticon',
		'copy',
		'clean:grunticon',
	]);

	grunt.registerTask('_buildNode', [
		'concat',
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