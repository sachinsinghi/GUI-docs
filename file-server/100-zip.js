/***************************************************************************************************************************************************************
 *
 * Collect and zip all files
 *
 **************************************************************************************************************************************************************/


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
var Archiver = require('archiver');


(function(App) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function() {
		App.debugging( 'Zip: Initiating', 'report' );
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Zip all files up and send to response
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.getZip = function() {
		App.debugging( 'Zip: compiling zip', 'report' );

		App.response.writeHead(200, {
			'Content-Type': 'application/zip',
			'Content-disposition': 'attachment; filename=GUI-flavour.zip',
		});

		App.zip.archive.pipe( App.response );

		App.zip.archive.finalize(); //send to server

	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Add a file to the zip archive
	//
	// @param   content      [string]  The content of the file
	// @param   archivePath  [string]  The path this file will have inside the archive
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.addFiles = function( content, archivePath ) {
		App.debugging( 'Zip: Adding files', 'report' );

		App.zip.archive.append( content, { name: archivePath } );

		if( App.zip.isQueuingEmpty() ) {
			App.zip.getZip();
		}

	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Add or remove a type to queue so we can wait for all to be finished
	//
	// @param   type           [string]   Identifier for a type of file we are waiting for
	// @param   _isBeingAdded  [boolean]  Whether or not this type is added or removed from the queue
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.queuing = function( type, _isBeingAdded ) {
		App.debugging( 'Zip: Queuing files', 'report' );

		if( _isBeingAdded ) {
			App.zip.queue[type] = true;
		}
		else {
			if( App.zip.queue[type] ) {
				delete App.zip.queue[type];
			}
		}

	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Check if the queue is empty
	//
	// @return  [boolean]  Whether or not it is...
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.isQueuingEmpty = function() {
		App.debugging( 'Zip: Checking queue', 'report' );

		for( var prop in App.zip.queue ) {
			if( App.zip.queue.hasOwnProperty(prop) ) {
				return false;
			}
		}

		return true;
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Global vars
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.queue = {}; //global object to hold queue
	module.archive = Archiver('zip'); //class to add files to zip globally


	App.zip = module;


}(App));