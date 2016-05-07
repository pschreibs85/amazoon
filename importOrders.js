var fs = require("fs");
var sqlite3 = require("sqlite3").verbose();
var csv = require("csv");

//
// `params` reads options from the command line (via minimist).
//
// Try console logging it when experimenting with different
// command line options.
//
var params = require("minimist")(process.argv.slice(2));

var ORDERS_FILENAME		 = (params.from || "data/orders.csv");
var DB_FILENAME 			 = (params.to || "data/amazoon.db");
var DB_SCHEMA_FILENAME = "amazoon.sql";

var dbSchema = fs.readFileSync(DB_SCHEMA_FILENAME,{ encoding: "utf-8" });
var db = new sqlite3.Database(DB_FILENAME,onConnected);

//
// TODO: print some help text to let the CLI user know how to
//       use this tool


// ************************************

function onConnected(err) {
	if (err) {
		console.log("Database connection error.",err.toString());
		return;
	}

	// This sets database to serialized mode, which causes
	// the library to run each query sequentially
	// (as opposed to running them all in parallel).
	db.serialize();


	// TIPS:
	//
	// These 3 steps all need to be **asynchronous**:
	//
	// 1. Initialize database schema.
	//    For example: db.exec( dbSchema, ... )
	//
	// 2. Parse the CSV **one record at a time** (see `parseCSV()`).
	//
	// 3. Insert the data **for each record** into your tables. Then,
	// repeat step (2).

}

function parseCSV() {
	// connect to the CSV file
	var file = fs.createReadStream(ORDERS_FILENAME);

	// setup the CSV parser
	var parser = csv.parse({
		columns: true,
		auto_parse: true
	});

	// pipe the CSV file into the CSV parser
	file.pipe(parser);


	// wait for the CSV parser to be ready to give you data
	//
	// NOTE: This event is likely to be fired multiple times while
	// reading your CSV file.
	parser.on("readable",function(){
		var record;

		// TIPS:
		//
		// To read a single `record` from the CSV file:
		//
		// record = parser.read();
		//
		// `record` is an object representing a row of the CSV file.
		//  Console log it to see what it looks like.
		//
		// Because the SQL commands you'll use to add this data
		// to the database are all async, you cannot just simply
		// run a synchronous loop (for, while, etc) to read all the
		// records at once. You need to figure out how to wait until
		// the processing for a record is done before moving on to
		// the next record (hint: callback). How will you know when
		// the CSV row's data is finished being inserted into the
		// database?
		//
		//
		// Example Usage:
		//
		// processCSVRow( record, ... );

	});

	parser.on("end",function(){

		// CSV parsing is now complete. Maybe print a message
		// confirming that, mentioning how many records were
		// imported, etc. There are **14** records, so make sure
		// they all get imported!

	});

}

function processCSVRow(record, ... (what else here?)) {

	// TODO: do some normalization of the record's data, as
	// necessary.


	// TIPS:
	//
	// 1. Each record has data that will need to go into multiple
	// tables, and some of this data needs to reference
	// (via primary/foreign key relationships) other data that's
	// already been inserted.
	//
	//
	// 2. DO NOT use the public ID's (like "ABC-123-5") as the actual
	// primary/foreign keys; use `id INTEGER PRIMARY KEY ASC` type
	// fields in your tables. HOWEVER, you'll use those public ID's
	// for figuring out which records in your table should be related
	// (via the real primary/foreign keys) to each other.
	//
	//
	// Example usage:
	//
	// insertCustomer(
	//    record["Customer ID"],
	//    record["Customer Name"],
	//    function insertComplete(err,insertedCustomerID) {
	//        // now use `insertedCustomerID` when inserting
	//        // the order data, etc
	//    }
	// );
	//

}

function insertCustomer(publicCustomerID,name,cb) {
	
	 //will need to get id of custer after inserted.  You can use select seq from sqlite_sequence where name ="table name"
	 // perhaps last_insert_rowid()  eg var x = db.lastInsertRowId;

	// SQL Tips:
	//
	// To INSERT:
	// db.run( " ..SQL.. ", function(err){
	//
	// })
	//
	// To SELECT:
	// db.get( " ..SQL.. ", function(err){
	//
	// })
	//
	// To SELECT and iterate over multiple records:
	// db.each( " .. SQL.. ", function(err, row){
	//
	// })
	//
	//
	// Example usage:
	//
	// db.run(
	//    'INSERT ... VALUES (?,?)',
	// 	  publicCustomerID,
	// 	  name,
	//    function(err) {
	//	     var lastInsertedID = this.lastID;
	//       cb( err, lastInsertedID );
	//    }
	// );

}
