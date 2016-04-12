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

/* FOLDERS */
var SETTINGS = function() {
	return {
		'folder': {
			'html': 'HTML',
			'modules': 'HTML/_includes/modules',
			'assets': 'HTML/_assets',
			'examples': 'HTML/_examples',
			'js': 'HTML/_assets/js',
			'less': 'HTML/_assets/less',
			'svg': 'HTML/_assets/svg',
			'css': 'HTML/_assets/css',
			'font': 'HTML/_assets/font',
			'img': 'HTML/_assets/img',
			'htaccess': 'HTML/_assets/htaccess',
			'temp': '.temp',
			'root': '',

			'prod': 'jekyll',
			'GUImaster': 'GUI-source-master',

			'GUIjson': 'GUI-source-master/GUI.json',
			'Packagejson': 'package.json',
			'GUIconfig': '.guiconfig',

			'OnlineGUIzip': 'https://github.com/WestpacCXTeam/GUI-source/archive/master.zip',
			'OnlineGUIjson': 'https://raw.githubusercontent.com/WestpacCXTeam/GUI-source/master/GUI.json',
		},

		'devBrand': 'WBG',
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
		var target = target ? target : 'dev'; //target can only be 'dev' or 'prod'
		var missing = []; //array of all missing modules
		var mod = 0;

		Object.keys( GUI.modules ).forEach(function iterateCategories( category ) {
			Object.keys( GUI.modules[category] ).forEach(function iterateModules( module ) {

				if( target == 'prod' && category != '_testing' && category != '_core' || target == 'dev' && category != '_core' ) { //exclude the _testing category all together in prod

					Object.keys( GUI.modules[category][module].versions ).forEach(function interateVersions( version ) {
						var path = SETTINGS().folder.modules + '/' + module + '/' + version + '.liquid'; //the path the module should be in
						mod++;

						grunt.verbose.writeln( 'Testing path: ' + path ); //for verbose user

						if( !grunt.file.exists(path) ) {
							missing.push( path ); //module not found so add it to array
						}

					});
				}
			});
		});

		if( missing.length > 0 ) { //if there is stuff in the array spit out an error and halt grunt
			grunt.log.writeln(); //empty line
			grunt.log.error('There are ' + Chalk.bgWhite.red( ' ' + missing.length + ' ' ) + ' module(s) not included in this GUI build! Please see below list:');
			grunt.fail.warn('Missing modules' + Chalk.bgWhite.red( "\n • " + missing.join("\n • ") ) + "\n\n" ); //list all missing module from array
		}
		else {
			grunt.log.ok('All ' + mod + ' modules found!');
		}
	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to move all examples into place and compile less
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('examples', 'Copy the examples into the prod folder for each brand and compile less', function( targetBrand ) {
		var GUI = grunt.file.readJSON( SETTINGS().folder.GUIjson ); //the GUI.json drives what module version has what examples
		var concatFiles = {};
		var concat = {};
		var copy = {};
		var less = {};

		Object.keys( GUI.modules ).forEach(function iterateCategories( category ) { //iterate all categories
			Object.keys( GUI.modules[category] ).forEach(function iterateModules( module ) { //iterate all modules
				Object.keys( GUI.modules[category][module].versions ).forEach(function interateVersions( version ) { //iterate all versions
					GUI.modules[category][module].versions[version].brands.forEach(function iterateBrands( brand ) { //iterate all brands
						if( targetBrand === brand || !targetBrand ) { //only show selected brand or everything if targetBrand is not defined

							//////////////////////////////////////| COPY HTML
							copy[ 'Example' + module + version + 'HTML' + brand ] = {
								files: [{
									cwd: '<%= SETTINGS.folder.examples %>/' + module + '/',
									src: [
										'**/*.html',
										'**/*.md',
										'**/*.liquid',
										'!_assets/**/*',
										'!_*/**/*',
									],
									dest: '<%= SETTINGS.folder.prod %>/' + brand + '/examples/' + module + '/',
									filter: 'isFile',
									expand: true,
								}],
							};

							//////////////////////////////////////| COPY CSS
							copy[ 'Example' + module + version + 'CSS' + brand ] = {
								files: [{
									cwd: '<%= SETTINGS.folder.examples %>/' + module + '/' + version + '/_assets/css/' + brand + '/',
									src: [
										'**/*.css',
									],
									dest: '<%= SETTINGS.folder.prod %>/' + brand + '/examples/' + module + '/' + version + '/assets/css/',
									filter: 'isFile',
									expand: true,
								}],
							};

							//////////////////////////////////////| COPY FONT
							copy[ 'Example' + module + version + 'Font' + brand ] = {
								files: [{
									cwd: '<%= SETTINGS.folder.examples %>/' + module + '/' + version + '/_assets/font/' + brand + '/',
									src: [
										'**/*',
									],
									dest: '<%= SETTINGS.folder.prod %>/' + brand + '/examples/' + module + '/' + version + '/assets/font/',
									filter: 'isFile',
									expand: true,
								}],
							};

							//////////////////////////////////////| COPY IMAGE
							copy[ 'Example' + module + version + 'Img' + brand ] = {
								files: [{
									cwd: '<%= SETTINGS.folder.examples %>/' + module + '/' + version + '/_assets/img/' + brand + '/',
									src: [
										'**/*.png',
										'**/*.jpg',
									],
									dest: '<%= SETTINGS.folder.prod %>/' + brand + '/examples/' + module + '/' + version + '/assets/img/',
									filter: 'isFile',
									expand: true,
								}],
							};


							//////////////////////////////////////| CONCAT JS
							concatFiles['<%= SETTINGS.folder.prod %>/' + brand + '/examples/' + module + '/' + version + '/assets/js/example.min.js'] =
								['<%= SETTINGS.folder.examples %>/' + module + '/' + version + '/_assets/js/*.js'];


							//////////////////////////////////////| COMPILE LESS
							less[ 'Example' + module + version + 'Less' + brand ] = {
								options: {
									cleancss: true,
									compress: true,
									ieCompat: true,
									report: 'min',
									plugins : [ new (require('less-plugin-autoprefix'))({ browsers: [ 'last 2 versions', 'ie 8', 'ie 9', 'ie 10' ] }) ],
								},
								src: [
									'<%= SETTINGS.folder.examples %>/' + module + '/' + version + '/_assets/less/' + brand + '/example.less',
								],
								dest: '<%= SETTINGS.folder.prod %>/' + brand + '/examples/' + module + '/' + version + '/assets/css/example.min.css',
							};
						}
					});
				});
			});
		});

		//create tasks
		concat[ 'ExampleJS' ] = {
			options: {
				nonull: true,
			},
			files: concatFiles,
		};

		//assigning tasks
		grunt.config.set('copy', copy);
		grunt.task.run('copy');

		grunt.config.set('concat', concat);
		grunt.task.run('concat');

		grunt.config.set('less', less);
		grunt.task.run('less');
	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to clean folders and files from grunticon
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('cleanGrunticon', 'Clean folders and files from grunticon', function( targetBrand ) {
		var GUIconfig = grunt.file.readJSON( SETTINGS().folder.GUIconfig );
		var clean = grunt.config.get('clean');
		var grunticon = [];

		GUIconfig.brands.forEach(function iterateBrands( brand ) { //iterate all brands
			if( targetBrand === brand || !targetBrand ) { //only show selected brand or everything if targetBrand is not defined
				grunticon.push('<%= SETTINGS.folder.prod %>/' + brand + '/assets/css/grunticon.loader.js');
				grunticon.push('<%= SETTINGS.folder.prod %>/' + brand + '/assets/css/preview.html');
				grunticon.push('<%= SETTINGS.folder.prod %>/' + brand + '/assets/css/png/');
			}
		});

		clean['grunticon'] = grunticon;

		//assigning tasks
		grunt.config.set('clean', clean);
		grunt.task.run('clean:grunticon');
	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to clean folders and files from the testing environment
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('cleanTesting', 'Clean folders and files from the testing environment', function( targetBrand ) {
		var GUIconfig = grunt.file.readJSON( SETTINGS().folder.GUIconfig );
		var clean = grunt.config.get('clean');
		var testing = [];

		GUIconfig.brands.forEach(function iterateBrands( brand ) { //iterate all brands
			if( targetBrand === brand || !targetBrand ) { //only show selected brand or everything if targetBrand is not defined
				testing.push('<%= SETTINGS.folder.prod %>/' + brand + '/testing.md');
			}
		});

		clean['testing'] = testing;

		//assigning tasks
		grunt.config.set('clean', clean);
		grunt.task.run('clean:testing');
	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to replace version strings
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('replaceBrand', 'Replace version strings', function( targetBrand ) {
		var GUIconfig = grunt.file.readJSON( SETTINGS().folder.GUIconfig );
		var replace = grunt.config.get('replace');
		var tasks = [];

		GUIconfig.brands.forEach(function iterateBrands( brand ) { //iterate all brands
			if( targetBrand === brand || !targetBrand ) { //only show selected brand or everything if targetBrand is not defined
				replace[ brand ] = {
					src: [
						'<%= SETTINGS.folder.prod %>/' + brand + '/**/*.js',
						'<%= SETTINGS.folder.prod %>/' + brand + '/**/*.css',
						'<%= SETTINGS.folder.prod %>/' + brand + '/**/*.html',
						'<%= SETTINGS.folder.prod %>/' + brand + '/**/*.md',
						'<%= SETTINGS.folder.prod %>/' + brand + '/**/*.liquid',
					],
					overwrite: true,
					replacements: [
						{
							from: '[Brand]',
							to: brand.toUpperCase(),
						},
						{
							from: '[brand]',
							to: brand.toLowerCase(),
						},
					],
				};

				tasks.push( brand );
			}
		});

		//assigning tasks
		grunt.config.set('replace', replace);

		tasks.forEach(function iterateTasks( taskTarget ) {
			grunt.task.run( 'replace:' + taskTarget );
		});
	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to compile less for each brand
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('compileLess', 'Compile less for each brand', function( targetBrand ) {
		var GUIconfig = grunt.file.readJSON( SETTINGS().folder.GUIconfig );
		var files = {};
		var less = {};

		GUIconfig.brands.forEach(function iterateBrands( brand ) { //iterate all brands
			if( targetBrand === brand || !targetBrand ) { //only show selected brand or everything if targetBrand is not defined
				files['<%= SETTINGS.folder.prod %>/' + brand + '/assets/css/site-<%= pkg.version %>.min.css'] = '<%= SETTINGS.folder.assets %>/less/theme-' + brand + '.less';
			}
		});

		less['GUI'] = {
			options: {
				cleancss: true,
				compress: true,
				ieCompat: true,
				report: 'min',
				plugins : [ new (require('less-plugin-autoprefix'))({ browsers: [ 'last 2 versions', 'ie 8', 'ie 9', 'ie 10' ] }) ],
			},
			files: files,
		};

		//assigning tasks
		grunt.config.set('less', less);
		grunt.task.run('less');
	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to Concat all grunticon files
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('concatGrunticon', 'Concat all grunticon files', function( targetBrand ) {
		var GUIconfig = grunt.file.readJSON( SETTINGS().folder.GUIconfig );
		var concat = {};

		GUIconfig.brands.forEach(function iterateBrands( brand ) { //iterate all brands
			if( targetBrand === brand || !targetBrand ) { //only show selected brand or everything if targetBrand is not defined
				var files = {};

				files['<%= SETTINGS.folder.prod %>/' + brand + '/assets/css/symbols-<%= pkg.version %>.data.svg.css'] = [
					'<%= SETTINGS.folder.prod %>/' + brand + '/assets/css/symbols-<%= pkg.version %>.data.svg.css',
					'<%= SETTINGS.folder.css %>/' + brand + '/symbols.data.svg.css',
				];

				files['<%= SETTINGS.folder.prod %>/' + brand + '/assets/css/symbols-<%= pkg.version %>.data.png.css'] = [
					'<%= SETTINGS.folder.prod %>/' + brand + '/assets/css/symbols-<%= pkg.version %>.data.png.css',
					'<%= SETTINGS.folder.css %>/' + brand + '/symbols.data.png.css',
				];

				files['<%= SETTINGS.folder.prod %>/' + brand + '/assets/css/symbols-<%= pkg.version %>.fallback.css'] = [
					'<%= SETTINGS.folder.prod %>/' + brand + '/assets/css/symbols-<%= pkg.version %>.fallback.css',
					'<%= SETTINGS.folder.css %>/' + brand + '/symbols.fallback.css',
				];

				concat[ 'grunticon' + brand ] = {
					files: files,
				};
			}
		});

		//assigning tasks
		grunt.config.set('concat', concat);
		grunt.task.run('concat');
	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to concat all js files
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('concatJS', 'Concat all js files', function( targetBrand ) {
		var GUIconfig = grunt.file.readJSON( SETTINGS().folder.GUIconfig );
		var concat = {};
		var files = {};

		GUIconfig.brands.forEach(function iterateBrands( brand ) { //iterate all brands
			if( targetBrand === brand || !targetBrand ) { //only show selected brand or everything if targetBrand is not defined
				files['<%= SETTINGS.folder.prod %>/' + brand + '/assets/js/site-<%= pkg.version %>.min.js'] = [
					'<%= SETTINGS.folder.js %>/**/*jquery*.js',
					'<%= SETTINGS.folder.js %>/**/*store*.js',
					'<%= SETTINGS.folder.prod %>/' + brand + '/assets/js/site-<%= pkg.version %>.min.js',
				];
			}
		});

		concat[ 'JS' ] = {
			files: files,
		};

		//assigning tasks
		grunt.config.set('concat', concat);
		grunt.task.run('concat');
	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to uglify all js files
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('uglifyJS', 'Uglify all js files', function( targetBrand ) {
		var GUIconfig = grunt.file.readJSON( SETTINGS().folder.GUIconfig );
		var uglify = {};
		var files = {};

		GUIconfig.brands.forEach(function iterateBrands( brand ) { //iterate all brands
			if( targetBrand === brand || !targetBrand ) { //only show selected brand or everything if targetBrand is not defined
				files['<%= SETTINGS.folder.prod %>/' + brand + '/assets/js/site-<%= pkg.version %>.min.js'] = [
					'<%= SETTINGS.folder.js %>/**/*.js',
					'!<%= SETTINGS.folder.js %>/**/*jquery*.js',
					'!<%= SETTINGS.folder.js %>/**/*store*.js',
				];
			}
		});

		uglify[ 'JS' ] = {
			options: {
				mangle: false,
				report: 'gzip',
			},
			files: files,
		};

		//assigning tasks
		grunt.config.set('uglify', uglify);
		grunt.task.run('uglify');
	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to compile all SVGs
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('compileGrunticon', 'Compile all SVGs', function( targetBrand ) {
		var GUIconfig = grunt.file.readJSON( SETTINGS().folder.GUIconfig );
		var grunticon = {
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
		};

		GUIconfig.brands.forEach(function iterateBrands( brand ) { //iterate all brands
			if( targetBrand === brand || !targetBrand ) { //only show selected brand or everything if targetBrand is not defined
				grunticon[ brand ] = {
					files: [{
						expand: true,
						cwd: '<%= SETTINGS.folder.svg %>/',
						src: [
							'all/*.svg',
							brand + '/*.svg',
						],
						dest: '<%= SETTINGS.folder.prod %>/' + brand + '/assets/css',
					}],

				};
			}
		});

		//assigning tasks
		grunt.config.set('grunticon', grunticon);
		grunt.task.run('grunticon');
	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to copy grunticon files to where they should go
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('copyGrunticon', 'Copy grunticon files to where they should go', function( targetBrand ) {
		var GUIconfig = grunt.file.readJSON( SETTINGS().folder.GUIconfig );
		var copy = grunt.config.get('copy');
		var tasks = [];

		GUIconfig.brands.forEach(function iterateBrands( brand ) { //iterate all brands
			if( targetBrand === brand || !targetBrand ) { //only show selected brand or everything if targetBrand is not defined
				copy[ 'grunticon' + brand ] = {
					files: [{
						cwd: '<%= SETTINGS.folder.prod %>/' + brand + '/assets/css/png/',
						src: ['**/*.png'],
						dest: '<%= SETTINGS.folder.prod %>/' + brand + '/assets/img/',
						filter: 'isFile',
						expand: true,
					}],
				};

				tasks.push( 'grunticon' + brand );
			}
		});

		//assigning tasks
		grunt.config.set('copy', copy);

		tasks.forEach(function iterateTasks( taskTarget ) {
			grunt.task.run( 'copy:' + taskTarget );
		});
	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to copy HTML files to prod folder
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('copyHTML', 'Copy HTML files to prod folder', function( targetBrand ) {
		var GUIconfig = grunt.file.readJSON( SETTINGS().folder.GUIconfig );
		var copy = grunt.config.get('copy');
		var tasks = [];

		GUIconfig.brands.forEach(function iterateBrands( brand ) { //iterate all brands
			if( targetBrand === brand || !targetBrand ) { //only show selected brand or everything if targetBrand is not defined
				copy[ 'HTML' + brand ] = {
					files: [{
						cwd: '<%= SETTINGS.folder.html %>/',
						src: [
							'**/*.html',
							'**/*.md',
							'**/*.liquid',
							'!_assets/**/*',
							'!_examples/**/*',
							'!_*/**/*',
						],
						dest: '<%= SETTINGS.folder.prod %>/' + brand + '/',
						filter: 'isFile',
						expand: true,
					}],
				};

				tasks.push( 'HTML' + brand );
			}
		});

		//assigning tasks
		grunt.config.set('copy', copy);

		tasks.forEach(function iterateTasks( taskTarget ) {
			grunt.task.run( 'copy:' + taskTarget );
		});
	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to copy font files to prod folder
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('copyFonts', 'Copy font files to prod folder', function( targetBrand ) {
		var GUIconfig = grunt.file.readJSON( SETTINGS().folder.GUIconfig );
		var copy = grunt.config.get('copy');
		var tasks = [];

		GUIconfig.brands.forEach(function iterateBrands( brand ) { //iterate all brands
			if( targetBrand === brand || !targetBrand ) { //only show selected brand or everything if targetBrand is not defined
				copy[ 'Fonts' + brand ] = {
					files: [{
						cwd: '<%= SETTINGS.folder.font %>/' + brand + '/',
						src: [
							'**/*.eot',
							'**/*.svg',
							'**/*.ttf',
							'**/*.woff',
							'**/*.woff2',
						],
						dest: '<%= SETTINGS.folder.prod %>/' + brand + '/assets/font/',
						filter: 'isFile',
						expand: true,
					}],
				};

				tasks.push( 'Fonts' + brand );
			}
		});

		//assigning tasks
		grunt.config.set('copy', copy);

		tasks.forEach(function iterateTasks( taskTarget ) {
			grunt.task.run( 'copy:' + taskTarget );
		});
	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to copy image files to prod folder
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('copyImages', 'Copy image files to prod folder', function( targetBrand ) {
		var GUIconfig = grunt.file.readJSON( SETTINGS().folder.GUIconfig );
		var copy = grunt.config.get('copy');
		var tasks = [];

		GUIconfig.brands.forEach(function iterateBrands( brand ) { //iterate all brands
			if( targetBrand === brand || !targetBrand ) { //only show selected brand or everything if targetBrand is not defined
				copy[ 'Images' + brand ] = {
					files: [{
						cwd: '<%= SETTINGS.folder.img %>/' + brand + '/',
						src: [
							'**/*.png',
							'**/*.jpg',
						],
						dest: '<%= SETTINGS.folder.prod %>/' + brand + '/assets/img/',
						filter: 'isFile',
						expand: true,
					}],
				};

				tasks.push( 'Images' + brand );
			}
		});

		//assigning tasks
		grunt.config.set('copy', copy);

		tasks.forEach(function iterateTasks( taskTarget ) {
			grunt.task.run( 'copy:' + taskTarget );
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
			debugDev: {
				src: [
					'<%= SETTINGS.folder.prod %>/**/*.html',
					'<%= SETTINGS.folder.prod %>/**/*.md',
					'<%= SETTINGS.folder.prod %>/**/*.js',
					'<%= SETTINGS.folder.prod %>/**/*.css',
					'<%= SETTINGS.folder.prod %>/**/*.liquid',
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
		// Copy all grunticon fallback pngs to img folder
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		copy: {
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
						'!_examples/**/*',
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

			//guiconfig.json
			GUIconfig: {
				files: [{
					cwd: '.',
					src: [
						'<%= SETTINGS.folder.GUIconfig %>',
					],
					dest: '<%= SETTINGS.folder.prod %>/_data',
					rename: function(dest, src) {
						return dest + '/guiconfig.json';
					},
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
			js: {
				files: [
					'<%= SETTINGS.folder.js %>/**/*.js',
				],
				tasks: [
					'_js',
					'jekyll:dev',
					'wakeup',
				],
			},

			less: {
				files: [
					'<%= SETTINGS.folder.less %>/**/*.less',
				],
				tasks: [
					'_less',
					'jekyll:dev',
					'wakeup',
				],
			},

			svg: {
				files: [
					'<%= SETTINGS.folder.less %>/svg/**/*.svg',
				],
				tasks: [
					'_svg',
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
					'_html',
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

	grunt.registerTask('_js', [
		'uglifyJS:' + SETTINGS().devBrand,
		'concatJS:' + SETTINGS().devBrand,
		'replace:jekyll',
		'replaceBrand:' + SETTINGS().devBrand,
		'replace:debugDev',
	]);

	grunt.registerTask('_less', [
		'compileLess:' + SETTINGS().devBrand,
		'replace:jekyll',
		'replaceBrand:' + SETTINGS().devBrand,
		'replace:debugDev',
	]);

	grunt.registerTask('_svg', [
		'compileGrunticon:' + SETTINGS().devBrand,
		'copyGrunticon:' + SETTINGS().devBrand,
		'copyHTML:' + SETTINGS().devBrand,
		'copyFonts:' + SETTINGS().devBrand,
		'copyImages:' + SETTINGS().devBrand,
		'concatGrunticon:' + SETTINGS().devBrand,
		'cleanGrunticon:' + SETTINGS().devBrand,
	]);

	grunt.registerTask('_html', [
		'copyHTML:' + SETTINGS().devBrand,
		'copy:HTML_',
		'copy:GUIjson',
		'copy:GUIconfig',
		'examples:' + SETTINGS().devBrand,
		'replace:jekyll',
		'replaceBrand:' + SETTINGS().devBrand,
		'replace:debugDev',
	]);

	grunt.registerTask('_buildDocs', [
		'compileLess:' + SETTINGS().devBrand,
		'uglifyJS:' + SETTINGS().devBrand,
		'concatJS:' + SETTINGS().devBrand,
		'compileGrunticon:' + SETTINGS().devBrand,
		'copyGrunticon:' + SETTINGS().devBrand,
		'copyHTML:' + SETTINGS().devBrand,
		'copy:HTML_',
		'copy:GUIjson',
		'copy:GUIconfig',
		'copyFonts:' + SETTINGS().devBrand,
		'copyImages:' + SETTINGS().devBrand,
		'concatGrunticon:' + SETTINGS().devBrand,
		'examples:' + SETTINGS().devBrand,
		'replace:jekyll',
		'replaceBrand:' + SETTINGS().devBrand,
		'cleanGrunticon:' + SETTINGS().devBrand,
	]);

	grunt.registerTask('_buildAllDocs', [
		'clean:jekyll',
		'compileLess',
		'uglifyJS',
		'concatJS',
		'compileGrunticon',
		'copyGrunticon',
		'copyHTML',
		'copy:HTML_',
		'copy:GUIjson',
		'copy:GUIconfig',
		'copyFonts',
		'copyImages',
		'concatGrunticon',
		'examples',
		'lessExamples',
		'replace:jekyll',
		'replaceBrand',
		'cleanGrunticon',
	]);


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Build tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('default', [ //run build with watch
		'clean:jekyll',
		'build',
		'connect',
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
		'checkIncludes:dev',
		'_buildDocs',
		'replace:debugDev',
		'jekyll:dev',
		'wakeup',
	]);

	grunt.registerTask('building', [ //run everything with debug on without gui check
		'font:title',
		'checkIncludes:dev',
		'_buildDocs',
		'replace:debugDev',
		'jekyll:dev',
		'wakeup',
	]);

	grunt.registerTask('prod', [ //run everything with debug off
		'font:title',
		'_checkGUI',
		'checkIncludes:prod',
		'_buildAllDocs',
		'replace:debugProd',
		'cleanTesting',
		'jekyll:prod',
		'wakeup',
	]);

	grunt.registerTask('proding', [ //run everything with debug off without gui check
		'font:title',
		'checkIncludes:prod',
		'_buildAllDocs',
		'replace:debugProd',
		'cleanTesting',
		'jekyll:prod',
		'wakeup',
	]);

	grunt.registerTask('server', [ //run everything with debug off without gui check
		'font:title',
		'connect',
		'watch',
		'wakeup',
	]);

};