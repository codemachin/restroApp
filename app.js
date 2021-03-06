var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));

app.use(logger('dev'));

app.use('/',express.static(__dirname + '/public'));


var dbPath  = "mongodb://localhost/myRest";

// command to connect with database

db = mongoose.connect(dbPath);

mongoose.connection.once('open', function() {

	console.log("database connection open success");

});



// fs module, by default module for file management in nodejs
var fs = require('fs');

// include all our model files
fs.readdirSync('./servers/app/models').forEach(function(file){
	// check if the file is js or not
	if(file.indexOf('.js'))
		// if it is js then include the file from that folder into our express app using require
		require('./servers/app/models/'+file);

});// end for each

// include controllers
fs.readdirSync('./servers/app/controllers').forEach(function(file){
	if(file.indexOf('.js')){
		// include a file as a route variable
		var route = require('./servers/app/controllers/'+file);
		//call controller function of each file and pass your app instance to it
		route.controllerFunction(app);

	}

});//end for each



/////////////////////////////// error handling illegal routes /////////////////////////////////////

app.use(function(req, res) {
   
  res.status(404).send("You hit an incorrect path. Check again");
    
}); 

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});