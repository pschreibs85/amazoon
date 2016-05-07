var fs = require("fs");
var sqlite3 = require("sqlite3").verbose();

var params = require("minimist")(process.argv.slice(2),{
	default: { "format": "text" }
});

if (params.help || !params.report) {
	help();
	return;
}

var DB_FILENAME = "data/amazoon.db";

var db = new sqlite3.Database(DB_FILENAME,onConnected);

// DEBUG!
// db.on("trace",function onTrace(sql){
// 	console.log("Trace:",sql);
// });


// ************************************

function help() {
	console.log("");
	console.log("Amazoon Reporting:");
	console.log("  --report=..   to specify which report to run");
	console.log("  --id=..       to specify the ID for certain reports");
	console.log("");
	console.log("  Reports available:");
	console.log("    * allOrders");
	console.log("    * shippedOrders");
	console.log("    * product (by ID)");
	console.log("    * order (by ID)");
	console.log("");
}

function onConnected(err) {
	if (err) {
		console.error("Database connection error.",err.toString());
		return;
	}

	db.serialize();

	switch (params.report) {
		case "allOrders":
			allOrders();
			break;
		case "shippedOrders":
			shippedOrders();
			break;
		case "product":
			if (params.id) {
				productByPublicID(params.id);
			}
			else {
				help();
			}
			break;
		case "order":
			if (params.id) {
				orderByPublicID(params.id);
			}
			else {
				help();
			}
			break;
		default:
			help();
	}

	db.close();
}

function allOrders() {

	// SQL Tips:
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
	// db.each(
	//    'SELECT ... LEFT JOIN ...',
	//    function onRow(err,row) {
	//	     // store `row` somewhere
	//    },
	//    function onComplete(err) {
	//
	//       // ...
	//
	//       tableOutput( /* ..all rows.. */ );
	//    }
	// );

}

function shippedOrders() {
}

function productByPublicID(publicProductID) {
}

function orderByPublicID(publicOrderID) {
}


// ******************************

function padStrRight(str,toLength,char) {
	str = String(str);
	if (str.length < toLength) {
		for (var i = str.length; i < toLength; i++) {
			str += char;
		}
	}
	return str;
}

// TIP:
//
// `tableOutput(..)` expects an array of objects, where the
// property names of the objects correspond to the column names
// to display in the table.

function tableOutput(records) {
	var table = [], columnMaxWidths = [];

	if (!Array.isArray(records)) {
		records = [records];
	}

	if (records.length == 0 || !records[0]) return;

	var fields = Object.keys(records[0]);

	// process table column headers
	fields.forEach(function eacher(fieldName,idx){
		columnMaxWidths[idx] = Math.max( (columnMaxWidths[idx] || 0), fieldName.length );
		table[0] = table[0] || [];
		table[0][idx] = fieldName;
	});

	// process table rows
	records.forEach(function eacher(record){
		var tableRow = [];

		// process table columns
		fields.forEach(function eacher(fieldName,idx){
			columnMaxWidths[idx] = Math.max( columnMaxWidths[idx], String(record[fieldName]).length );
			tableRow[idx] = record[fieldName];
		});

		table.push(tableRow);
	});

	var tableWidth = 4 +
		columnMaxWidths.reduce(function reducer(total,width){ return total + width; },0) +
		((columnMaxWidths.length - 1) * 3)
	;

	// print table top
	console.log("|" + padStrRight("",tableWidth-2,"-") + "|");

	// print table rows
	table.forEach(function eacher(row,idx){
		// print row
		var rowStr = "|";
		row.forEach(function eacher(cellText,idx){
			rowStr += " " + padStrRight(cellText,columnMaxWidths[idx]," ") + " |";
		});
		console.log(rowStr);

		// add column row separator
		if (idx == 0) {
			console.log("|" + padStrRight("",tableWidth-2,"-") + "|");
		}
	});

	// print table bottom
	console.log("|" + padStrRight("",tableWidth-2,"-") + "|");
}
