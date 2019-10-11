var express = require("express");
var mongoose = require("mongoose"); //Mongo object modelling 
var expressHandlebars = require("express-handlebars");
var request = require("request"); //Makes http calls
var cheerio = require("cheerio"); //Scraper
var bodyParser = require("body-parser"); //JSON responses

// Port configuration for local/Heroku
var PORT = process.env.PORT || process.argv[2] || 8080;

// Require all models
var db = require("./models");

// Initialize Express
var app = express();

var router = express.Router();

// Use express.static to serve the public folder as a static directory
app.use(express.static(__dirname + "/public"));

// Handlebars
app.engine("handlebars", expressHandlebars({ 
	defaultLayout: "main" 
}));
app.set("view engine", "handlebars");

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
	 extended: false 

}));


app.use(router);
// Connect to the Mongo DB
const MongoDB = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.connect(db, function(eror) {

	if (error) {
		console.log(error);
	}
	else {
		console.log("mongoose connection successful");
	}
});
mongoose.connect(MONGODB_URI);

// Start the server
app.listen(PORT, function () {
    console.log(`This application is running on port: ${PORT}`);
});